---
layout: post
title: "Convert Mercurial project to Git"
date: 2017-08-28 04:35:53 +0200
year: "2017"
month: "2017/08"
categories:
  - Posts
tags:
  - mercurial
  - git
  - convert
---

I'm using fast-export:

```
cd ~
git clone https://github.com/frej/fast-export.git
git init git_repo
cd git_repo
~/fast-export/hg-fast-export.sh -r /path/to/old/mercurial_repo
git checkout HEAD
```

source: https://stackoverflow.com/questions/16037787/convert-mercurial-project-to-git
