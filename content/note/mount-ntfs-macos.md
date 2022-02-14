---
title: "Mounting an NTFS disk on macOS"
date: 2022-02-14T02:36:31+01:00
year: "2022"
month: "2022/02"
# categories:
#   - Posts
# tags:
#   - linux
slug: mount-ntfs-macos
draft: false
---

## First method

Unfortunately NTFS is not natively supported on macOS, but sometimes we need write access to an NTFS disk.

To do so, there are two possibilities

Install the `ntfs-3g` package from _darelover_, as the original package is not updated to macOS Big Sur.

```
brew cask install osxfuse
brew install darelover/ntfs-3g/ntfs-3g
```

After installation, simply reboot your Mac, then you can easily mount your own drive in read/write mode.

```
sudo /usr/local/bin/ntfs-3g /dev/disk3s1 /Volumes/NTFS -olocal -oallow_other -o auto_xattr
```

## Second method

The first method works as long as you have not installed macfuse from keybase on your Mac, but if you have already, then no problem, you can now download the [mounty.app](https://mounty.app/) where you can mount the disk with one click, or mount with cli

```
sudo mount -t ntfs -o rw,auto,nobrowse /dev/disk3s1 ~/NTFS
sudo umount ~/NTFS
```

Now we have access to our NTFS drive again.
