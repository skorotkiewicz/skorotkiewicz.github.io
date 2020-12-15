---
layout: post
title: "Linux tar Command - Creating tar file via CLI"
date: 2012-10-01T11:24:23+00:00
year: "2012"
month: "2012/10"
categories:
  - Posts
tags:
  - linux
  - commands
  - cli
---

# Creating a tar archive

```
tar -cvf archiveName.tar directoryToPack/
```

or

```
tar -cvf archiveName.tar /dir1 /dir2 file1 file2
```

or

```
tar -cvf archive.tar /dir/music /dir/photos /dir/text.txt
```

# Unpacking tar

```
tar -zxvf archiveName.tar
```

You can also unpack single files or directories using their list (divided by spaces) at the end of the command:

```
tar -xf archiveName.tar file1 file2 dir1 dir2
```

# Packaging the same file formats

```
tar cvzf allphps.tar *.php
```

# List the contents of a tar file

List all files in allphps.tar

```
tar tvf allphps.tar
```
