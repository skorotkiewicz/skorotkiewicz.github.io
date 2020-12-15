---
layout: post
title: '"Bash Here" Context Menu in Windows Explorer'
date: 2018-12-16 07:54:26 +0200
year: "2018"
month: "2018/12"
categories:
  - Posts
tags:
  - linux
  - bash
  - windows
---

Here for bash

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\ConEmu Bash Here]
@="ConEmu Bash Here"
"Icon"="C:\\Users\\sebas\\Desktop\\Programy\\ConEmuPack\\ConEmu64.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\ConEmu Bash Here\command]
@="\"C:\\Users\\sebas\\Desktop\\Programy\\ConEmuPack\\ConEmu64.exe\" -here -run {bash} -cur_console:n"
```

Here for cmd

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\ConEmu CMD Here]
@="ConEmu CMD Here"
"Icon"="C:\\Users\\sebas\\Desktop\\Programy\\ConEmuPack\\ConEmu64.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\ConEmu CMD Here\command]
@="\"C:\\Users\\sebas\\Desktop\\Programy\\ConEmuPack\\ConEmu64.exe\" -here -run {cmd} -cur_console:n"
```

> Remember to change the path to ConEmu installation and rename the username to your own

<p><img src="/images/techlog/heremenu.png" /></p>
