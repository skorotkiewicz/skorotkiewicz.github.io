---
layout: post
title: "Debian 9: Change the network from enp3s0 to eth0"
date: 2017-07-05 16:17:32 +0200
year: "2017"
month: "2017/07"
categories:
  - Posts
tags:
  - linux
  - debian
  - network
  - enp
  - eth
---

```
nano /etc/udev/rules.d/10-network.rules
```

```
SUBSYSTEM=="net", ACTION=="add", ATTR{address}=="08:00:27:a6:ad:0e", NAME="eth0"
SUBSYSTEM=="net", ACTION=="add", ATTR{address}=="08:00:27:6e:77:cc", NAME="wlan0"
```

then reboot.
