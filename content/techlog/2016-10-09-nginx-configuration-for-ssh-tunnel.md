---
layout: post
title: Nginx configuration for SSH tunnel
date: 2016-10-09T21:06:32+00:00
year: "2016"
month: "2016/10"
categories:
  - Posts
tags:
  - linux
  - nginx
  - ssh
  - tunel
---

```
upstream tunnel {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name dev.server.tld www.dev.server.tld;

  #optional
  location / {
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;

    proxy_pass http://tunnel;
  }
}
```

```
ssh -vnNT -R 3000:localhost:80 root@server.tld
```
