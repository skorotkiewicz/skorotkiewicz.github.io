---
layout: post
title: "Activate tap to click on touchpad"
date: 2018-12-08 19:52:54 +0200
year: "2018"
month: "2018/12"
categories:
  - Posts
tags:
  - linux
  - debian
  - touchpad
  - tap
---

## Debian Stretch / Arch Linux

Remove the `xserver-xorg-input-synaptics` package. **(important)**

```
# apt remove xserver-xorg-input-synaptics
```

```
## Arch
[root@arch ~]# pacman -Ss libinput
extra/libinput 1.12.3-1 [installed]
    Input device management and event handling library
extra/xf86-input-libinput 0.28.1-1 (xorg-drivers) [installed]
    Generic input driver for the X.Org server based on libinput
```

Install `xserver-xorg-input-libinput`:

```
## Debian
# apt install xserver-xorg-input-libinput
```

> In most cases, make sure you have the `xserver-xorg-input-libinput` package installed, and not the `xserver-xorg-input-synaptics` package.

Create the `40-libinput.conf` file:

```bash
# echo 'Section "InputClass"
        Identifier "libinput touchpad catchall"
        MatchIsTouchpad "on"
        MatchDevicePath "/dev/input/event*"
        Driver "libinput"
        Option "Tapping" "on"
EndSection' > /etc/X11/xorg.conf.d/40-libinput.conf
```

restart your DM:

```
# systemctl restart lightdm
```

or

```
# systemctl restart gdm3
```

Debian wiki : [Enable tapping on touchpad](https://wiki.debian.org/SynapticsTouchpad#Debian_9_.22Stretch.22)  
Source: [thanks GAD3R](https://unix.stackexchange.com/a/337218)
