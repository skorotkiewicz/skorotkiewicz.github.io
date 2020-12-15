---
layout: post
title: List crontab for all users
date: 2012-11-30T22:03:27+00:00
year: "2012"
month: "2012/11"
categories:
  - Posts
tags:
  - linux
  - crontab
---

```
for user in $(cut -f1 -d: /etc/passwd); do
   echo $user; crontab -u $user -l;
done
```

`for user in $(cut -f1 -d: /etc/passwd); do echo $user; crontab -u $user -l; done`
