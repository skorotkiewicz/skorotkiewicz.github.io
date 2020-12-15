---
layout: post
title: "FIX: make: Nothing to be done for `first`."
date: 2013-12-21T17:05:28+00:00
year: "2013"
month: "2013/12"
categories:
  - Posts
tags:
  - linux
  - make
  - qmake
---

following error:  
make: Nothing to be done for \`first\`.

Solution:

```
qmake -project && qmake hello.pro && make
```
