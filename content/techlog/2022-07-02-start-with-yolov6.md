---
title: "Start With Yolo V6"
date: 2022-07-02T19:25:21+02:00
year: "2022"
month: "2022/07"
# categories:
#   - Posts
tags:
  - linux
  - yolo
  - conda
  - ffmpeg
slug: start-with-yolov6
draft: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/biWGd6F0q_s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Create conda environment:  
`$ conda create -n yolo python=3.8 -y`

Activate environment:  
`$ conda activate yolo`

Download repo and install dependencies:

```
$ git clone https://github.com/meituan/YOLOv6 && cd YOLOv6
$ pip install -r requirements.txt
```

Download a pretrained model from the YOLOv6 [release](https://github.com/meituan/YOLOv6/releases/tag/0.1.0)

Create new directory for frames:  
`$ mkdir input/`

Split video to frames:  
`ffmpeg -i stepup.mp4 input/stepup_%04d.png`

Start to dedect objects in frames:  
`python tools/infer.py --weights yolov6n.pt --source input/`

Images to video:  
`$ ffmpeg -r 23.98 -s 1920x800 -f image2 -start_number 1 -i runs/inference/exp/stepup_%04d.png -vcodec libx264 -crf 25 -pix_fmt yuv420p stepup_2.mp4`

Get audio from video:  
`$ ffmpeg -i stepup.mp4 stepup.aac`

Copy original audio to new video:  
`$ ffmpeg -i stepup_2.mp4 -i stepup.aac -codec copy -shortest stepup_audio.mp4`
