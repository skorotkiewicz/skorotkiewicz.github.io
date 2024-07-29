---
layout: post
title: "Simple server backup"
date: 2016-01-01 18:10:58 +0200
year: "2016"
month: "2016/01"
categories:
  - Posts
tags:
  - linux
  - backup
---

```
sudo mount /dev/xxxx -o remount-ro /mnt

mkdir /backup
cd /backup

tar --exclude='/backup' --exclude='/mnt/backup' --exclude='/mnt/mnt' -cvjpf mybackup.tar.bz2 /mnt
```
<s>tar --exclude='./backup' --exclude='./mnt/backup' -cvjpf mybackup.tar.bz2 /mnt</s>

Then you unpack with behavior permission

`sudo tar -xvjpf mybackup.tar.bz2`

# Creating A Backup All Datebases And Restore

```
mysqldump -u root -p --all-databases > all_databases.sql
mysqldump -u root -p --all-databases < all_databases.sql
```

# Creating A Backup Single Datebase And Restore

```
mysqldump -u root -p db_name > db_file.sql
mysqldump -u root -p db_name < db_file.sql
```

<br />

# Split larger files into smaller parts? No problem!

Lets says I have an image and its too big (10MB). All I do is:<br />

`split --bytes=1M /path/to/image/image.jpg /path/to/image/prefixForNewImagePieces`

and then to put it together I use cat:<br />

`cat prefixFiles* > newimage.jpg`
