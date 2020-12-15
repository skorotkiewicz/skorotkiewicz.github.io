---
layout: post
title: "Create an encrypted file container with dm-crypt"
date: 2018-03-11 14:32:13 +0200
year: "2018"
month: "2018/03"
categories:
  - Posts
tags:
  - linux
  - luks
  - dm-crypt
  - encryption
  - container
---

Create an empty file with the size of your container

```bash
dd if=/dev/zero bs=1M count=100 of=~/my-container.img
```

_Here I’ll use a 100MB container_

Initialise the LUKS partition on the file and set the initial passphrase.

```bash
cryptsetup luksFormat ~/mycontainer
```

Open the container. Opening the container creates a kernel device file which can then be mounted.

```bash
cryptsetup luksOpen ~/mycontainer secret-device
```

This command will prompt for the container’s passphrase and then create a device file with the name `/dev/mapper/secret-device`. You may choose another name than “secret-device”.

The container is now decrypted. Since the device has no filesystem yet we still cannot put any data on it. Use mkfs.ext4 to create an ext4 filesystem on the decrypted container:

```bash
mkfs.ext4 /dev/mapper/secret-device
```

Now the filesystem can be mounted like a filesystem on a regular block device.

```bash
mkdir ~/my-mount-point
mount /dev/mapper/secret-device ~/my-mount-point
```

You can now write to the directory as usual. Once you are done follow these steps to unmount the device and close (= re-encrypt) the container:

```bash
umount ~/my-mount-point
cryptsetup luksClose secret-device
```

To access the container again only these two commands are required:

```bash
cryptsetup luksOpen ~/mycontainer secret-device
mount /dev/mapper/secret-device ~/my-mount-point
```

Source: https://elephly.net/posts/2013-10-01-dm-crypt.html
