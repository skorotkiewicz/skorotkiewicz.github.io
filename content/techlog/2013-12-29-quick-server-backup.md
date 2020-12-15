---
layout: post
title: Quick server backup
date: 2013-12-29T02:30:09+00:00
year: "2013"
month: "2013/12"
categories:
  - Posts
tags:
  - linux
  - backup
---

```
mount /dev/xxxx -o remount-ro /mnt
tar -cvjpf serverbackup.tar.bz2 /mnt
```

then unpack the behavior of permissions

```
tar -xvjpf serverbackup.tar.bz2
```

here my script with mysql backup. backup.sh

```
# create backup catalog
mkdir /backup
# clean
aptitude clean
rm /var/log/*.gz
rm /var/log/apache2/*.gz
rm /var/log/apt/*.gz
rm /var/log/clamav/*.gz
rm /var/backups/*.gz
# start archive
tar -cvjpf /backup/backup_bin.tar.bz2 /bin
tar -cvjpf /backup/backup_home.tar.bz2 /home
tar -cvjpf /backup/backup_lib.tar.bz2 /lib
tar -cvjpf /backup/backup_root.tar.bz2 /root
tar -cvjpf /backup/backup_usr.tar.bz2 /usr
tar -cvjpf /backup/backup_etc.tar.bz2 /etc
tar -cvjpf /backup/backup_lib64.tar.bz2 /lib64
tar -cvjpf /backup/backup_sbin.tar.bz2 /sbin
tar -cvjpf /backup/backup_var.tar.bz2 /var
# backup mysql
mysqldump -u root -p<PASSWORD> --all-databases > /backup/all_databases.sql
# archiving of all backups to a single file
tar -cvjpf /backup_`date +"%F"`.tar.bz2 /backup
# send backup to another server
scp /backup_`date +"%F"`.tar.bz2 user@server:/home/backup
# remove local backup
rm -R /backup /backup_`date +"%F"`.tar.bz2

```

**update**  
backup from remote server 192.168.0.100 to local /mnt

```
mount /dev/sda1 /mnt/
rsync -aHxv root@192.168.0.100:/* /mnt --exclude=/dev --exclude=/proc --exclude=/sys --exclude=/tmp
```
