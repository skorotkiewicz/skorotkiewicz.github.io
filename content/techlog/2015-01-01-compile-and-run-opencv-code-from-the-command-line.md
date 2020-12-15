---
layout: post
title: "Compile and run OpenCV code from the command line"
date: 2015-01-01 18:10:58 +0200
year: "2015"
month: "2015/01"
categories:
  - Posts
tags:
  - linux
  - opencv
---

# For OpenCV 2.4.x

`cd /path/to/opencv/samples/c/`

# For OpenCV 3

`cd /path/to/opencv/samples/cpp/`

# Compile

```
g++ -ggdb `pkg-config --cflags --libs opencv` facedetect.cpp -o facedetect
```

# run

`./facedetect`
