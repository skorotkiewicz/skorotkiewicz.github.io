---
title: "Setup user autostart and properly configure systemd in Arch Linux"
date: 2024-01-12T07:00:00+02:00
year: "2024"
month: "2024/01"
# categories:
#   - Posts
tags:
  - networking
  - server
slug: setup-user-autostart-archlinux
draft: false
---

Create user:

- `useradd -m -s /bin/bash username`

Create example service, like node app:

- `nano ~/.config/systemd/user/app.service`

containing:

```
[Unit]
Description=One of the servers

[Service]
ExecStart=/usr/bin/node /home/username/server.js

[Install]
WantedBy=default.target
```

From root run:
`loginctl enable-linger username`

and from user add:
`DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$UID/bus`

to `/home/username/.bashrc`

Then user can run:
`systemctl --user enable app.service`

enable/disable/start/stop/status
