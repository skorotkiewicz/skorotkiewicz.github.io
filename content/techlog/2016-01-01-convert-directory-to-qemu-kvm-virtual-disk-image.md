---
layout: post
title: "Convert directory to QEMU/KVM virtual disk image"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - qemu
  - vm
---

First, create a raw image of the required size. I'll assume 10G is enough. Using seek creates a sparse file, which saves space.

`dd if=/dev/null of=example.img bs=1M seek=10240`

Next, create a filesystem on it.

`mkfs.ext4 -F example.img`

(Note that you need the -F option for mkfs.ext4 to operate on a file as opposed to a disk partition)

Then, mount it.

```
mkdir /mnt/example
mount -t ext4 -o loop example.img /mnt/example
```

Now you can copy your files to `/mnt/example`. Once this is done, unmount it and you can use example.img as a drive in a virtual machine.
If you want you can convert it from a raw image to another format like `qcow2e` using `qemu-img`, but this isn't required.
