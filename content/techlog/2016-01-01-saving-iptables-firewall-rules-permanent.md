---
layout: post
title: "Saving Iptables Firewall Rules Permanent"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - iptables
  - firewall
---

run as root

`sudo -s`

Save current firewall rules to file

`iptables-save > /etc/firewall.conf`

INCLUDE ON BOOT

```
echo '#!/bin/sh' > /etc/network/if-up.d/iptables
echo "iptables-restore < /etc/firewall.conf" >> /etc/network/if-up.d/iptables
chmod +x /etc/network/if-up.d/iptables
```

SAVE ON SHUTDOWN/REBOOT

```
echo '#!/bin/sh' > /etc/network/if-down.d/iptables
echo "iptables-save > /etc/firewall.conf" >> /etc/network/if-down.d/iptables
chmod +x /etc/network/if-down.d/iptables
```

is working for me

if you what to save your iptables rules after an change to iptables just run below.. but it will run the same command on reboot or shutdown.

`iptables-save > /etc/firewall.conf`
