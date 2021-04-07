---
title: "Convert all FLAC music collection to Apple Lossless (ALAC)"
date: 2021-04-07T19:46:33+02:00
year: "2021"
month: "2021/04"
# categories:
#   - Posts
# tags:
#   - linux
slug: flac-to-alac
draft: false
---

It preserve the metadata by itself.

To do every flac in a directory:

```
for f in ./*.flac; do ffmpeg -i "$f" -c:v copy -c:a alac "${f%.*}.m4a"; done
mkdir ALAC
mv *.m4a to ALAC
```
