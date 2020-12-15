---
layout: post
title: "Weechat BNC"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - weechat
  - irc
  - bnc
---

```
openssl s_client -connect znc.itunix.cloud:6697 </dev/null 2>/dev/null | openssl x509 -in /dev/stdin -noout -fingerprint -sha256  | sed s/://g | cut -c 20-
```

5A038025E789ED2F1032EB15XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX08FA693

```
/server add BNC znc.itunix.cloud/6697 -ssl -username=l__q/freenode -password=XXXXXXXXXXXX -autoconnect
/set irc.server.BNC.ssl_fingerprint 5A038025E789ED2F1032EB15XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX08FA693
/connect BNC
/save
```
