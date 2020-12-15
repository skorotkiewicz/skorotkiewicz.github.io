---
layout: post
title: Nginx proxy_pass
date: 2013-05-09T09:48:18+00:00
year: "2013"
month: "2013/05"
categories:
  - Posts
tags:
  - linux
  - nginx
---

From synchtube.itunix.eu:1337 to synchtube.itunix.eu

```
server {
#  listen      66.225.195.83;
   server_name synchtube.itunix.eu;
   access_log  /var/log/nginx/access.log;
   error_log   /var/log/nginx/error.log;

   location / {
        proxy_pass  http://synchtube.itunix.eu:1337;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
        proxy_buffering off;
        proxy_set_header        Host            static.example.com;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```
