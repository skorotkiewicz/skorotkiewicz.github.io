---
layout: post
title: "LEDE /OpenWRT on USB Stick"
date: 2018-03-24 01:23:49 +0200
year: "2018"
month: "2018/03"
categories:
  - Posts
tags:
  - linux
  - lede
  - openwrt
  - usb
---

Prepare your USB Stick:
`mkfs.ext4 /dev/sda1`

Install pacages on your router

```
opkg update;
opkg install block-mount kmod-usb-core kmod-usb-ohci kmod-usb-storage kmod-usb2 kmod-scsi-core kmod-scsi-generic kmod-fs-ext4 libblkid
```

Plug your USB Stick into your router

```
mount /dev/sda1 /mnt
tar -C /overlay -cvf - . | tar -C /mnt -xf -
umount /mnt
```

Edit fstab

```
block detect > /etc/config/fstab
vim /etc/config/fstab
```

Config:

```
root@LEDE:~# cat /etc/config/fstab
config 'global'
        option  anon_swap       '0'
        option  anon_mount      '0'
        option  auto_swap       '1'
        option  auto_mount      '1'
        option  delay_root      '5'
        option  check_fs        '0'

config 'mount'
        option  target  '/overlay'
        option  uuid    '<uuid>'
        option  enabled '1'
        option  fstype  'ext4'
```

Set the target to **/overlay**, and change the **option enabled** line from **0** to **1**.  
Now enable the **fstab** service at startup

`/etc/init.d/fstab enable`

Check

```
root@LEDE:~# df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/root                 2.3M      2.3M         0 100% /rom
tmpfs                    13.8M      1.0M     12.7M   8% /tmp
/dev/sda1                28.1G     46.5M     26.6G   0% /overlay
overlayfs:/overlay       28.1G     46.5M     26.6G   0% /
tmpfs                   512.0K         0    512.0K   0% /dev
```

<img src="/images/techlog/usbstick_lede.png" />
