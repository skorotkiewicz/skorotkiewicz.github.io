---
layout: post
title: Own IRC Server on Debian
date: 2012-11-30T20:20:50+00:00
year: "2012"
month: "2012/11"
categories:
  - Posts
tags:
  - linux
  - irc
---

1. `aptitude install ircd-irc2`
2. `nano /etc/ircd/ircd.conf`

```
M:irc.<HOSTNAME>::<COUNTRY>::000A
A:<NAME>:<EMAIL>::<COMPANYNAME>:
Y:1:90::100:512000:5.5:100.100
Y:2:90::300:512000:5.5:250.250
I:*:::0:1
I:127.0.0.1/32:::0:1
I:192.168.0.0/24::::0:2
P::::6667:
```

3.

```
nano /etc/ircd/ircd.motd
Your welcome text
```

4. `/etc/init.d/ircd restart`
