---
layout: post
title: "How to configure iptables for openvpn"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - iptables
  - openvpn
---

If you have installed the openvpn server and iptable is blocking the service by default then use these configurations for openvpn to function properly. First let's allow the tcp connection on the openvpn port. If you are using udp or another port number then change this line accordingly.

`iptables -A INPUT -i eth0 -m state --state NEW -p udp --dport 1194 -j ACCEPT`

Allow TUN interface connections to OpenVPN server

`iptables -A INPUT -i tun+ -j ACCEPT`

Allow TUN interface connections to be forwarded through other interfaces

```
iptables -A FORWARD -i tun+ -j ACCEPT
iptables -A FORWARD -i tun+ -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -o tun+ -m state --state RELATED,ESTABLISHED -j ACCEPT
```

NAT the VPN client traffic to the Internet. change the ip address mask according to your info of tun0 result while running "ifconfig" command.

`iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE`

If your default iptables OUTPUT value is not ACCEPT, you will also need a line like:

`iptables -A OUTPUT -o tun+ -j ACCEPT`

That's it now restart the iptables service and you are finished.
