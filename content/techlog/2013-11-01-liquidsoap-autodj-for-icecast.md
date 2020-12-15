---
layout: post
title: "Liquidsoap: AutoDJ for icecast"
date: 2013-11-01T15:03:30+00:00
year: "2013"
month: "2013/11"
categories:
  - Posts
tags:
  - radio
  - icecast
  - dj
---

Wonder it&#8217;s called &#8220;Liquidsoap&#8221;. Is a piece of firmware that can really do a lot of things. What does it do? Starting play playlists, depending on the time or any logic, he can listen to Icecast or Shoutcast instead, is able to download the streams from other servers, mix them, detect or work, etc&#8230;

Configuration looks like this:

```
#!/usr/bin/liquidsoap
set("log.file.path","/tmp/basic-radio.log")

# required speech synthesizer, aptitude install festival
message = "That's it! you listening the radio dubstep is our life, listen to us at school, at home or at a party with friends"
messagesorry = "Sorry for the inconvenience, continuation of the program soon!"

welcome = single("say:"^message)
sorryvoice = single("say:"^messagesorry)

# find /home/music/ -type f -name "*.mp3" > /etc/liquidsoap/music.m3u
radio   = playlist("music.m3u")
dubstep = playlist("dubstep.m3u")

#play a random playlist with random music
radio   = random(weights = [1, 3, 1],[welcome, radio, dubstep])

#if the music not available
radio = fallback(track_sensitive=false, [radio, sorryvoice])

#if the live broadcast available
full = fallback(track_sensitive=false, [input.http("http://nsa310:8000/live"), radio])

# Stream it out (ogg)
#output.icecast(%vorbis, host = "localhost", port = 8000, password = "<PASSWORD>", mount = "/radio.ogg", full)

# Stream in mp3 ~Low Quality
output.icecast(%mp3(bitrate=32, samplerate=22050, stereo=false), mount="/radio-32.mp3", host="localhost", port=8000, password="<PASSWORD>", mean(full))

# Stream in mp3 ~High Quality
output.icecast(%mp3(bitrate=128), mount="/radio-128.mp3", host="localhost", port=8000, password="<PASSWORD>", full)

```

There is a lot of options to configure according to your needs, here are more examples: [documentation](http://savonet.sourceforge.net/doc-svn/documentation.html "documentation").
