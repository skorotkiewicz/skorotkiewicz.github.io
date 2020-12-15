---
layout: post
title: "Minio: How's bucket policy related to anonymous/authorized access?"
date: 2018-03-30 23:50:35 +0200
year: "2018"
month: "2018/03"
categories:
  - Posts
tags:
  - linux
  - minio
  - bucket
  - s3
---

thanks [Cumbu from stackoverflow.com](https://stackoverflow.com/a/47074349/2922741)!

'public' is valid policy...

You can change this policy: install mc (minio client) and then:

```bash
# list default hosts after install:
mc config host ls

# remove all hosts: mc config host rm {hostName}
mc config host rm local

# add your host: mc config host add {hostName} {url} {apiKey} {apiSecret}
mc config host add local http://127.0.0.1:9000 ClientIdASSDSD ClientSecretASASASdsasdasdasdasd

# create bucket: mc mb {host}/{bucket}
mc mb local/mybucket

# change bucket policy: mc policy {policy} {host}/{bucket}
mc policy public local/mybucket
```
