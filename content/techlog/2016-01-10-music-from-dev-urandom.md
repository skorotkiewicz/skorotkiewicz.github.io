---
layout: post
title: "'Music' from /dev/urandom"
date: 2016-01-10 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - urandom
---

```bash
cat /dev/urandom | hexdump -v -e '/1 "%u\n"' | awk '{ split("0,2,4,5,7,9,11,12",a,","); for (i = 0; i < 1; i+= 0.0001) printf("%08X\n", 100*sin(1382*exp((a[$1 % 8]/12)*log(2))*i)) }' | xxd -r -p | aplay -c 2 -f S32_LE -r 16000
```
