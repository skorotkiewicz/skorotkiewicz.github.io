---
layout: post
title: "debootstrap debian chroot"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - chroot
  - debian
---

`# debootstrap --arch i386 squeeze /mnt http://ftp.halifax.rwth-aachen.de/debian`

```
# chroot /mnt
# apt-get install linux-image-686
# apt-get install grub2
```

(answer to Continue without installing GRUB? with Yes)

`# passwd root`

(put any password you want. If you miss this step, you
are not logging into your new system ;)

`# exit`

```
# mount -o bind /dev/ /mnt/pendrive/dev/
# mount -o bind /proc/ /mnt/pendrive/proc/
# mount -o bind /sys/ /mnt/pendrive/sys/
```

```
# chroot /mnt
# grub-install /dev/sdc
```

Installation finished. No error reported.

or not from chroot:
`grub-install --force --removable --boot-directory=/mnt/boot /dev/sdc`
