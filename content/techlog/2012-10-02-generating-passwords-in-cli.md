---
layout: post
title: Generating passwords in cli
date: 2012-10-02T12:29:20+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - password
---

-c = length of the password

```
< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c10
```

generating random txt

```
< /dev/urandom tr -dc [:print:] | head -c10000 > lol.txt
```
