---
layout: post
title: How to change the description of the Stream in Liquidsoap
date: 2014-06-22T09:27:44+00:00
year: "2014"
month: "2014/06"
categories:
  - Posts
tags:
  - linux
  - stream
  - radio
  - icecast
---

```
output.icecast( %mp3(bitrate=96), mount="/radio-96.mp3",
	genre="electronic",
	description="ITUnix Radio Electronic Music",
	name="ITUnix Radio",
	url="http://radio.itunix.eu",
	host="localhost",
	port=8147,
	password="PASSWORD", radio)

```

example 2

```
output.icecast( %mp3(stereo=false, bitrate=16, samplerate=22050),
	host="audio3.radioreference.com",
	port = 80, password =  "xxxxxxxxx", genre="Scanner",
	description="Scanner audio", mount="/xxxxxxxx",
	name="Baltimore Maryland Police/Fire/EMS", user="source",
	url="http://www.scanbaltimore.com", radio)

```
