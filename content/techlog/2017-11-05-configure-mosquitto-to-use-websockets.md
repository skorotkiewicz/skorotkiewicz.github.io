---
layout: post
title: "Configure mosquitto to use websockets"
date: 2017-11-05 01:51:12 +0200
year: "2017"
month: "2017/11"
categories:
  - Posts
tags:
  - linux
  - websocket
  - mosquitto
  - mqtt
---

Add the following lines to `/etc/mosquitto/mosquitto.conf` in the "Default Listener" section:
<br />

```

 port 1883
 listener 9001
 protocol websockets

```
