---
layout: post
title: Screenshot with date and Countdown
date: 2012-12-24T00:31:33+00:00
year: "2012"
month: "2012/12"
categories:
  - Posts
tags:
  - linux
  - screenshot
---

Install: save code to `/usr/bin/screenshot`  
Usage: `screenshot 5`  
five us for 5sec countdown

```
#!/bin/sh
if [ $1 ]
then
	scrot -cd $1 "%Y-%m-%d_`echo $(date +%H-%m-%S)`.png" -e 'mv $f /home/modinfo/shots/'
        echo "Screenshot save in: /home/modinfo/shots/`echo $(date +%Y-%m-%d_%H-%m-%S)`.png"
else
	scrot "%Y-%m-%d_`echo $(date +%H-%m-%S)`.png" -e 'mv $f /home/modinfo/shots/'
        echo "Screenshot save in: /home/modinfo/shots/`echo $(date +%Y-%m-%d_%H-%m-%S)`.png"
fi
```
