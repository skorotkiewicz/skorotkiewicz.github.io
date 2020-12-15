---
layout: post
title: "Homeautomation - detect presence of Wifi devices"
date: 2018-06-02 20:12:51 +0200
year: "2018"
month: "2018/06"
categories:
  - Posts
tags:
  - linux
  - wifi
  - automation
  - openwrt
  - lede
  - mqtt
  - mosquitto
---

A simple shell script to detect presence of Wifi devices (smartphones, tablets, Amazon Dash Buttons, ..) and post the results via MQTT.
This information can be processed in Homeautomation Systems to turn down the heating when everyone left the appartment.

#### Install the MQTT client on your Router

Install the packages with opkg
`opkg install mosquitto-client`
`opkg install coreutils-nohup`
or with luci.

#### Copy over the script

Use SCP to copy the [presence_report](https://gitlab.itunix.eu/skorotkiewicz/owrtwifi2mqtt/blob/master/presence_report) script to `/usr/bin/presence_report` on the target device.
Call `chmod u+x /usr/bin/presence_report` to allow script execution.

#### Add the script to rc.local for autostart

Place the following lines

- `nohup /usr/bin/presence_report event 192.168.1.2 >/dev/null 2>&1 &`
- `nohup /usr/bin/presence_report lastseen 192.168.1.2 >/dev/null 2>&1 &`

inside the `/etc/rc.local` file before the `exit 0`. You can to this via command-line or via LuCI in System -> Startup -> Local Startup. The script will be executed after reboot.

### Usage

---

After installation the following topics will be published for each WiFi device, using the _lowercase_ MAC address:

    owrtwifi/status/mac-00-00-00-00-00-00/lastseen/iso8601

Payload contains the timestamp when the device was seen in an ISO 8601 (and OpenHAB) compatible format, like this: `2017-08-25T19:29:57+0200`

    owrtwifi/status/mac-00-00-00-00-00-00/lastseen/epoch

Unix epoch in seconds

    owrtwifi/status/mac-00-00-00-00-00-00/event

Message will be `new` or `del` and is sent right after the device connected/disconnected to/from WiFi.

### Files:

<div class="spoiler">
        <input type="checkbox" id="spoilerid_1">
                <label for="spoilerid_1">presence_report</label>
        <div class="spoiler_body">
<pre>
#!/bin/sh

DEFAULT_MODE="event"
DEFAULT_MQTT_SERVER="10.1.1.50"
DEFAULT_LAST_SEEN_UPDATE_PERIOD_S=120

MODE=$DEFAULT_MODE
MQTT_SERVER=$DEFAULT_MQTT_SERVER
LAST_SEEN_UPDATE_PERIOD_S=\$DEFAULT_LAST_SEEN_UPDATE_PERIOD_S

MQTT_ID_EVENT="OpenWRT-Presence-Event"
MQTT_ID_LASTSEEN="OpenWRT-Presence-LastSeen"
MQTT_TOPIC="owrtwifi/status/mac-"

SCRIPT_NAME="$(basename "$(test -L "$0" && readlink "$0" || echo "\$0")")"

# Parse command line args

test_for_mode(){
param_mode=$1
  if [ "$param_mode" == "event" -o "$param_mode" == "lastseen" ]; then
    MODE=$param_mode
return 0
fi
return 1
}

test_for_ipv4(){
param_ip=$1
  echo $param_ip | grep -E '\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b' > /dev/null
  if [ $? -eq 0 ]; then
MQTT_SERVER=\$param_ip
return 0
fi
return 1
}

test_for_update_periode_s(){
param_up=$1
  expr $param_up : '[0-9][0-9]\*$'
  if [ $? -eq 0 ]; then
LAST_SEEN_UPDATE_PERIOD_S=\$param_up
return 0
fi
return 1
}

print_usage(){
cat << EOF
Supported optional parameters:
mode: "event" or "lastseen" (default: $DEFAULT_MODE)
    In event mode changes of registered mac addresses are imediately pushed to the MQTT server
    In lastseen mode the registered mac addresses are periodically pushed to the MQTT server
  MQTT server IP: the IPv4 address of the MQTT server (default $DEFAULT_MQTT_SERVER)
Udate periode [s]: only relevant for lastseen mode (default $LAST_SEEN_UPDATE_PERIOD_S)
Examples:
  $SCRIPT_NAME
$SCRIPT_NAME 192.168.1.2
  $SCRIPT_NAME lastseen 300
EOF
}

for param in "$@"; do
  test_for_mode $param || \
 test_for_ipv4 $param || \
  test_for_update_periode_s $param || \
 { print_usage; exit 1; }
done

if [ "$MODE" == "event" ]; then
echo "$SCRIPT_NAME, mode: $MODE, MQTT server: $MQTT_SERVER"
  iw event | \
  while read LINE; do
    if echo $LINE | grep -q -E "(new|del) station"; then
EVENT=`echo $LINE | awk '/(new|del) station/ {print $2}'`
MAC=`echo $LINE | awk '/(new|del) station/ {print $4}'`

      echo "Mac: $MAC did $EVENT"
      mosquitto_pub -h $MQTT_SERVER -i $MQTT_ID_EVENT -t "$MQTT_TOPIC${MAC//:/-}/event" -m $EVENT
    fi

done
elif [ "$MODE" == "lastseen" ]; then
echo "$SCRIPT_NAME, mode: $MODE, MQTT server: $MQTT_SERVER, period: $LAST_SEEN_UPDATE_PERIOD_S"
while true
do
for interface in `iw dev | grep Interface | cut -f 2 -s -d" "`
do # for each interface, get mac addresses of connected stations/clients
maclist=`iw dev $interface station dump | grep Station | cut -f 2 -s -d" "`
for mac in $maclist
      do
        echo "lastseen epoch   ${mac//:/-} $(date +%s)"
        mosquitto_pub -h $MQTT_SERVER -i $MQTT_ID_LASTSEEN -t "$MQTT_TOPIC${mac//:/-}/lastseen/epoch" -m "$(date +%s)" -r
echo "lastseen iso8601 ${mac//:/-} $(date +%Y-%m-%dT%H:%M:%S%z)"
mosquitto_pub -h $MQTT_SERVER -i $MQTT_ID_LASTSEEN -t "$MQTT_TOPIC${mac//:/-}/lastseen/iso8601" -m "$(date +%Y-%m-%dT%H:%M:%S%z)" -r
      done
    done
    sleep ${LAST_SEEN_UPDATE_PERIOD_S}
done
fi

</pre>
        </div>
</div>

<div class="spoiler" style="padding-top: 2px;">
	<input type="checkbox" id="spoilerid_2">
		<label for="spoilerid_2">sample_client.py</label>
	<div class="spoiler_body">
<pre>
#!/usr/bin/env python
import paho.mqtt.client as mqtt
import os

def on_connect(client, userdata, flags, rc):
print("Connected with result code " + str(rc))

    #client.subscribe("owrtwifi/status/mac-ff-ff-ff-ff-ff-ff/event")
    client.subscribe("owrtwifi/status/+/event")

def on_message(client, userdata, msg):
print(msg.topic + " " + str(msg.payload))
a = str(msg.payload)

    if 'ff-ff-ff-ff-ff-ff' in msg.topic and 'new' in msg.payload:
        os.system("./speech.sh 'Sebastian join WiFi'")
    elif 'ff-ff-ff-ff-ff-ff' in msg.topic and 'del' in msg.payload:
        os.system("./speech.sh 'Sebastian leave WiFi'")

    else:
        if a == 'new':
            os.system("espeak 'Unknown client join WiFi'")
        elif a == 'del':
        os.system("espeak 'Unknown client leave WiFi'")
        else:
            print(str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()

</pre>
	</div>
</div>
