---
layout: post
title: "Remove all of the diacritics from a file"
date: 2017-11-24 16:29:35 +0200
year: "2017"
month: "2017/11"
categories:
  - Posts
tags:
  - linux
  - diacritics
---

I `like` iconv as it handles all accents variations :

`cat non-ascii.txt | iconv -f utf8 -t ascii//TRANSLIT//IGNORE > ascii.txt`
