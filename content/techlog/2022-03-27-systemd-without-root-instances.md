---
title: "Systemd Without Root and with Instances"
date: 2022-03-27T09:43:14+02:00
year: "2022"
month: "2022/03"
# categories:
#   - Posts
tags:
  - linux
  - systemd
slug: systemd-without-root-instances
draft: false
---

A user Systemd service should be placed in `~/.config/systemd/user/` directory if you want to have full ownership as normal user. Create it if it doesn’t exist.

```
mkdir -p  ~/.config/systemd/user/
```

## Create a systemd service unit file under the directory.

```
$ vim  ~/.config/systemd/user/SimpleHTTPServer@.service
[Unit]
Description=SimpleHTTPServer
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/bin/python3 -m http.server %i
WorkingDirectory=%h/Public
Restart=always

[Install]
WantedBy=multi-user.target
```

## Reload systemd.

```
$ systemctl --user daemon-reload
```

## Confirm the service is available.

```
$ systemctl --user list-unit-files SimpleHTTPServer@.service
UNIT FILE                 STATE
SimpleHTTPServer@.service disabled

1 unit files listed.
```

## You can start the service then after creation.

```
# 1991 is our port who listen

$ systemctl --user enable --now SimpleHTTPServer@1991
Created symlink /home/grizzly/.config/systemd/user/multi-user.target.wants/SimpleHTTPServer@1991.service → /home/grizzly/.config/systemd/user/SimpleHTTPServer@.service.
```

## Let’s check the status of our service.

```
$ systemctl --user status SimpleHTTPServer@1991.service
● SimpleHTTPServer@1991.service - SimpleHTTPServer
   Loaded: loaded (/home/grizzly/.config/systemd/user/SimpleHTTPServer@.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2022-03-27 09:51:28 CEST; 1min 30s ago
 Main PID: 13536 (python3)
   CGroup: /user.slice/user-14200.slice/user@14200.service/SimpleHTTPServer.slice/SimpleHTTPServer@1991.service
           └─13536 /usr/bin/python3 -m http.server 1991

Mar 27 09:51:28 de1 systemd[11908]: Started SimpleHTTPServer.
```

That’s the same process you’ll use to create any other Systemd service that you want to manage without privilege escalation or creating a different system user to run the service.
