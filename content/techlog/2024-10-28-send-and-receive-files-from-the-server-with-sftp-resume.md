---
title: "Send and Receive Files from the Server with sftp with resume"
date: 2024-10-28T07:00:00+02:00
year: "2024"
month: "2024/10"
# categories:
#   - Posts
tags:
  - sftp
  - linux
  - server
slug: send-and-receive-files-from-the-server-with-sftp-resume
draft: false
---

## Downloading a File from the Server

```
echo "get /var/www/html/d.zip /home/user/" | sftp root@a.sekor.eu.org

# directory:
echo "get -r /root/test" | sftp -r root@a.sekor.eu.org
```

This will download the file `d.zip` from the server directory `/var/www/html/` to your local directory `/home/user/`.

## Uploading a File to the Server

```
echo "put /home/user/d.zip /var/www/html/" | sftp root@a.sekor.eu.org

# directory:
echo "put -r  /home/modinfo/Desktop/test /root/" | sftp -r root@a.sekor.eu.org
```

This sends the `d.zip` file from your local computer directory `/home/user/` to the `/var/www/html/` directory on the server.
