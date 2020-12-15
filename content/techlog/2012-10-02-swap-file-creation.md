---
layout: post
title: Swap file creation
date: 2012-10-02T12:18:12+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - swap
---

A simple way to add extra memory to your machine .

Create an exchange file:

```bash
dd if=/dev/zero of=/swapfile bs=1M count=1024
```

_The above will create 1GB file (1M _ 1024)\*

Improving access rights:

```bash
chmod 600 /swapfile
```

Initialize it as a swap

```bash
mkswap /swapfile
```

Activate `/swapfile` swap space immediately:

```
swapon /swapfile
```

Make sure that it works:

```bash
free -m
```

To activate `/swapfile` after Linux system reboot, add entry to `/etc/fstab` file.

```
vim /etc/fstab
```

Add permanently to `/etc/fstab`:

```bash
sh -c 'echo "/swapfile swap swap defaults 0 0" >> /etc/fstab'
```

Yes, just that's it. From this moment we do not have to combine it with separate partitions, we can at any time enlarge/reduce the created exchange space (dd command).
