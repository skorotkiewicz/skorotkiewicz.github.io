---
layout: post
title: Generate a checksum of the files in a directory
date: 2012-10-02T23:05:34+00:00
year: "2012"
month: "2012/10"
categories: Posts
tags:
  - linux
  - security
---

```
find . -type f -print0 | xargs -0 md5sum >> checksum.md5
```
