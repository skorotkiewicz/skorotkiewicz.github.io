---
layout: post
title: "Reinstall all packages with --force on Arch"
date: 2018-03-11 22:08:46 +0200
year: "2018"
month: "2018/03"
categories:
  - Posts
tags:
  - linux
  - arch
  - archlinux
  - pacman
---

Here is simple solution

```
pacman -Qqen > pkglist.txt
pacman --force -S $(< pkglist.txt)
mkinitcpio -p linux
```
