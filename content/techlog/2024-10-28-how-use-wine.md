---
title: How to use Wine"
date: 2024-10-31T07:00:00+02:00
year: "2024"
month: "2024/10"
# categories:
#   - Posts
tags:
  - sftp
  - linux
  - wine
slug: how-use-wine
draft: false
---

tell wine to be 64 bit
tell wine to use folder ~/.wine64.ableton
export WINEARCH=win64
export WINEPREFIX=~/.wine64.ableton

mkdir -p "$WINEPREFIX"

run wine and choose Windows 7
wine64 winecfg

navigate to wine folder
cd "$WINEPREFIX"

install each requirement
winetricks gdiplus msxml3 msxml4 msxml6 vcrun2005 quicktime72 fontsmooth=rgb msls31 d3dcompiler_43 corefonts atmlib

Download Ableton Live

https://cdn-downloads.ableton.com/cha...

unzip the installer
go inside the installer folder

run the installer
export WINEARCH=win64
export WINEPREFIX=~/.wine64.ableton
wine64 Ableton\ Live\ 11\ Suite\ Installer.exe

After installation, when you want to run Ableton, use explorer.exe (unless someone can show me the right way to run it):

run Ableton Live
export WINEARCH=win64
export WINEPREFIX=~/.wine64.ableton
wine64 explorer.exe

Navigate into 'C:\ProgramData\Ableton\Live 11 Suite\Program\Ableton Live 11 Suite.exe'

    My Computer
    C Drive
    ProgramData
    Ableton
    Live 11 Suite
    Program
    Ableton Live 11 Suite.exe

Double click on Ableton Live 11 Suite.exe

'C:\ProgramData\Ableton\Live 11 Suite\Program\Ableton Live 11 Suite.exe'

Optional:
