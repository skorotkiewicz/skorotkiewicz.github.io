---
layout: post
title: Run programs in the screen at startup using systemd
date: 2016-12-05T18:40:24+00:00
year: "2016"
month: "2016/12"
categories:
  - Posts
tags:
  - linux
  - systemd
  - screen
  - startup
---

systemd is very simple and easy to use, here you can see how to run the program in a screen with the specified user  
create new file

```
nano /etc/systemd/system/radio.service
```

and put it into a new file

```bash
[Unit]
Description=Radio DJ
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/bin/screen -dmS screennameradio /etc/liquidsoap/radio-pro.liq
ExecStop=/usr/bin/screen -S screennameradio -X quit
RemainAfterExit=yes
User=radiodj

[Install]
WantedBy=multi-user.target
```

and, of course

```
systemctl enable radio
systemctl start radio
```
