---
layout: post
title: Rsync backup remote server to local
date: 2014-05-16T17:58:16+00:00
year: "2014"
month: "2014/05"
categories:
  - Posts
tags:
  - linux
  - rsync
  - backup
---

What can I say, a simple way to backup remote server on the local machine

```
rsync -aHxv root@remote.example.com:/* /local/backup/server/ \
		--exclude=/dev \
		--exclude=/proc \
		--exclude=/sys \
		--exclude=/tmp
```
