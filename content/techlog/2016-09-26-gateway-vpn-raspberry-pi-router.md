---
layout: post
title: "Gateway VPN - Raspberry Pi Router"
date: 2016-09-26 18:10:58 +0200
year: "2016"
month: "2016/09"
categories:
  - Posts
tags:
  - linux
  - vpn
  - raspberry
  - router
---

```
# nano /etc/sysctl.conf
# net.ipv4.ip_forward=1
# sysctl -p
```

```
# iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
# iptables -t nat -A POSTROUTING -o tap0 -j MASQUERADE
```

Enable VPN at boot
`# systemctl enable openvpn@Japan`

```
nano /etc/default/openvpn
#AUTOSTART="Japan"
```

##################################################

# cron:

`@reboot sh /etc/openvpn/startRouting.sh`

# cat /etc/openvpn/startRouting.sh

```
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -o tap0 -j MASQUERADE
```

# cron:

`0 0 * * * vnstati -i eth0 -o /var/www/bandwidth/current_s.png -s; vnstati -i eth0 -o /var/www/bandwidth/current_h.png -h; vnstati -i eth0 -o /var/www/bandwidth/current_d.png -d; vnstati -i eth0 -o /var/www/bandwidth/current_t.png -t; vnstati -i eth0 -o /var/www/bandwidth/current_m.png -m;`

`0 0 * * * vnstati -i tap0 -o /var/www/bandwidth/current_vpn_s.png -s; vnstati -i tap0 -o /var/www/bandwidth/current_vpn_h.png -h; vnstati -i tap0 -o /var/www/bandwidth/current_vpn_d.png -d; vnstati -i tap0 -o /var/www/bandwidth/current_vpn_t.png -t; vnstati -i tap0 -o /var/www/bandwidth/current_vpn_m.png -m;`
