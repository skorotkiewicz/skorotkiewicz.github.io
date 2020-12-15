---
layout: post
title: "Windows on Bash // GUI!"
date: 2017-06-26 18:10:58 +0200
year: "2017"
month: "2017/06"
categories:
  - Posts
tags:
  - windows
  - bash
  - gui
  - linux
---

1. Download VcXsrv (or any other X server) and run it.

2. Launch Bash and type in the following lines

```
# sudo apt-get install xorg xubuntu-desktop
# echo 'export DISPLAY=:0' >> ~/.bashrc && . ~/.bashrc
# sudo sed -i 's$<listen>.*</listen>$<listen>tcp:host=localhost,port=0</listen>$' /etc/dbus-1/session.conf
```

3. Close Bash and open it, then type in `xfce4-session` , if everything went right then the XFCE interface should show up in your X server window.

4. then install [Arc OSX Theme](https://www.gnome-look.org/content/show.php/Arc-OSX-themes?content=175536)

5. and [Super Flat Remix Icon Theme](https://www.gnome-look.org/content/show.php/Super+flat+remix+icon+theme?content=169073)

ProTip: If you don't want Windows to manage the applications' wm. Close everything then open XLaunch (not xming), then select "One window without title bar", then keep pressing next until finish. After clicking finish, open Bash and type xfce4-session

# EDIT

`bash.exe -c "DISPLAY=:0 /usr/bin/nohup /usr/bin/gvim"`

Make sure X is already running and adjust DISPLAY accordingly.

VcXsrv is better than Xming!
