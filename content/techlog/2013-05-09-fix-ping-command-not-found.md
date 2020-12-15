---
layout: post
title: "FIX ping: command not found"
date: 2013-05-09T09:39:35+00:00
year: "2013"
month: "2013/05"
categories:
  - Posts
tags:
  - linux
  - ping
  - command
---

```
root@nsa310:~# ping
-bash: ping: command not found
```

here is simple solution

```
# aptitude install inetutils-tools inetutils-ping
```

test it

```
root@nsa310:~# ping 127.0.0.1
PING 127.0.0.1 (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.128 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.091 ms
^C--- 127.0.0.1 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.091/0.110/0.128/0.000 ms

```
