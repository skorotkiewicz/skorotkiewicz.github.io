---
layout: post
title: "ffmpeg on Raspbian - Raspberry Pi"
date: 2016-09-30T16:44:33+00:00
year: "2016"
month: "2016/09"
categories:
  - Posts
tags:
  - linux
  - ffmpeg
  - raspberry
  - raspbian
---

First for all we need to build and install x264

```
git clone --depth 1 git://git.videolan.org/x264
cd x264
./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
make -j 4
sudo make install
```

**For mp3 support**

```
wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.tar.gz
tar xzvf lame-3.99.tar.gz
cd lame-3.99
./configure
make
make install
```

**For Hardware Encoding**

1. add `--enable-omx --enable-omx-rpi` to `./configure` options
2. compile
3. use encoder option `-c:v h264_omx`

**Then build and make ffmpeg**

```
git clone --depth=1 git://source.ffmpeg.org/ffmpeg.git
cd ffmpeg
./configure --arch=armel --target-os=linux --enable-gpl --enable-libx264 --enable-libmp3lame --enable-nonfree --enable-omx --enable-omx-rpi
make -j4
sudo make install
ldconfig
```

It takes just 25 minutes on a Raspberry Pi 3.  
In case you are wondering v4l2 should work with this.

**I provide a repository for this kind of stuff some day.**

```
git clone http://git.itunix.eu/git/x264/
git clone http://git.itunix.eu/git/ffmpeg/
```
