---
layout: post
title: "nmap - scan an ip range for a single open port"
date: 2012-10-02T11:35:55+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - nmap
---

```
nmap -p80 192.168.0.0/24 -oG - | grep 80/open
```

**Example**

> [modinfo@arch-pc ~]\$ nmap -p80 192.168.0.0/24 -oG - | grep 80/open  
> Host: 192.168.0.1 (router)    Ports: 80/open/tcp//http///  
> Host: 192.168.0.100 (aaa)    Ports: 80/open/tcp//http///  
> Host: 192.168.0.126 (nsa310)    Ports: 80/open/tcp//http///  
> Host: 192.168.0.133 (arch-pc)    Ports: 80/open/tcp//http///
