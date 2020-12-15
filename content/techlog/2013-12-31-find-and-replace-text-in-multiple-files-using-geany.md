---
layout: post
title: Find and replace text in multiple files using geany
date: 2013-12-31T21:26:59+00:00
year: "2013"
month: "2013/12"
categories:
  - Posts
tags:
  - linux
  - replace
  - geany
  - grep
---

To open all files, in which a specific string is found, from inside of a directory (and subdirectories) open Geany, select Terminal tab from Message Window and run next command inside:

```
grep -rHIF --exclude='/home/modinfo/bitcoin/*~' -- 'text_to_find' /bin/bash /home/modinfo/bitcoin/* | geany `awk 'BEGIN {FS="[:]"} {print $1}'`
```

[source](http://askubuntu.com/questions/302914/find-and-replace-text-in-multiple-files-using-geany "source")
