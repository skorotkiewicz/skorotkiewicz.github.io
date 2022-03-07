---
title: "Mounting an NTFS disk on macOS"
date: 2022-02-14T02:36:31+01:00
year: "2022"
month: "2022/02"
# categories:
#   - Posts
tags:
  - macos
  - ntfs
  - mount
slug: mount-ntfs-macos
draft: false
---

Unfortunately NTFS is not natively supported on macOS, but sometimes we need write access to an NTFS disk.

<strong>EDIT:</strong>

Now you can install the official osxfuse without any problem.

```
brew tap gromgit/homebrew-fuse
brew reinstall macfuse
brew install ntfs-3g-mac
```

And securely mount your USB drive in a read-write access:

```
sudo /usr/local/bin/ntfs-3g /dev/disk3s1 /Volumes/NTFS -olocal -oallow_other -o auto_xattr
```

The first time you try to mount it, you will be asked to give macOS permissions for osxfuse and a request for reboot.
After the reboot it will mount the drive nicely and safely again.

Now we have access to our NTFS drive again.

<div style="border: 1px solid #ff0000; padding: 5px;margin: 30px;">
Warning, do not use mounty.app, it works, but after a few writes it corrupts the files and you have to repair the disk from Windows!

Use only osxfuse: [github.com/osxfuse/osxfuse/wiki/NTFS-3G](https://github.com/osxfuse/osxfuse/wiki/NTFS-3G)

</div>

<h4>Have a wonderful day!</h4>

<details>
<summary style="cursor: pointer; color: blue">Here is an outdated entry</summary>
<s style="opacity: 0.3">

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

</s>
</details>
