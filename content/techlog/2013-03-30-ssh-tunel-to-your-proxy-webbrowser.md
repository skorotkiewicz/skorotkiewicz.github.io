---
layout: post
title: SSH Tunel to your Proxy Webbrowser
date: 2013-03-30T23:41:54+00:00
year: "2013"
month: "2013/03"
categories:
  - Posts
tags:
  - linux
  - ssh
  - tunel
  - proxy
  - web
---

```
$ ssh -4 -N -D 1025 root@server.com
```

1025 is a proxy port (localhost:1025)

![ssh_tunel](/images/techlog/ssh_tunel.jpg "ssh_tunel")
