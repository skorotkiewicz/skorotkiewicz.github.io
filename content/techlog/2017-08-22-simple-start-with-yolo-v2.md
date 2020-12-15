---
layout: post
title: "Simple start with YOLO v2"
date: 2017-08-22 17:14:30 +0200
year: "2017"
month: "2017/08"
categories:
  - Posts
tags:
  - linux
  - yolo
---

<iframe width="800" height="500" src="https://www.youtube.com/embed/2-5Z8SxP2WY?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

reduce frames to 15 per sec:<br />
`# ffmpeg -i stepup.mp4 -r 15 stepup15.mp4`

make new directory for frames and put to stepup/ a video to split<br />
`#mkdir stepup/; mkdir yolo_stepup/`

split to frames:<br />
`# ffmpeg -i stepup15.mp4 stepup_%04d.png`

lets begin the games!<br />
run this script, make sure are you not in stepup/, you shold be in darknet/<br />

```

#!/bin/bash
for file in stepup/*.png
do
  ./darknet detect cfg/yolo.cfg cfg/yolo.weights "$file"
  mv predictions.png yolo_"$file"
done

```

images to video (with 15 fps):<br />
`#ffmpeg -r 15 -f image2 -s 1920x800 -i stepup_%04d.png -vcodec libx264 -crf 25 -pix_fmt yuv420p stepup15.mp4`

get audio from video:<br />
`#ffmpeg -i stepup.mp4 stepup15.aac`

copy original audio to new video:<br />
`#ffmpeg -i stepup15.mp4 -i stepup15.aac -codec copy -shortest stepup15_audio.mp4`
