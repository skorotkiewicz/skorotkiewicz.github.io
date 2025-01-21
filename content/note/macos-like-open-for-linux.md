---
title: "MacOS like 'open' for Linux"
date: 2025-01-21T09:04:53+00:00
year: "2025"
month: "2025/01"
# categories:
#   - Posts
tags:
  - macos
  - linux
  - open
slug: macos-like-open-for-linux
draft: false
---

One thing I enjoy on my work Mac is the 'open' command. For the uninitiated, the command is treated similar to xdg-open. 
This script, saved as `/usr/local/bin/open` has basically the same outcome as the Mac 'open' command. Try it in a directory, or try using it on some file.

```
xdg-open "$1" &> /dev/null &
```