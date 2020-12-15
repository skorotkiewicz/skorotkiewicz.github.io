---
layout: post
title: Change photos to pencil sketch in CLI
date: 2012-10-02T22:00:22+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - photos
  - sketch
---

```
convert input.jpg -colorspace gray \( +clone -blur 0x2 \) +swap -compose divide-composite -linear-stretch 5%x0% output.jpg
```
