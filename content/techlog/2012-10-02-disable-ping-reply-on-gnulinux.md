---
layout: post
title: Disable ping reply on GNU/Linux
date: 2012-10-02T12:37:56+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - security
---

Disable ping reply temporarily

```
echo "1" > /proc/sys/net/ipv4/icmp_echo_ignore_all
```

Enable the ping reply back

```
echo "1" > /proc/sys/net/ipv4/icmp_echo_ignore_all
```
