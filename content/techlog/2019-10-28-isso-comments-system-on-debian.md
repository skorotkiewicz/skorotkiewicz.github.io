---
layout: post
title: "Isso comments system on Debian"
date: 2019-10-28 03:42:44 +0200
year: "2019"
month: "2019/10"
categories:
  - Posts
tags:
  - linux
  - isso
  - comments
  - debian
hidden: false
---

**Add isso user**

`useradd isso` and then `mkdir /home/isso/` then `su - isso`

**Install isso with pip**

```
pip install isso
```

### Config files

**cat /etc/systemd/system/isso.service**

```
[Unit]
Description=isso server

[Service]
User=isso
Environment="ISSO_SETTINGS=/home/isso/config/isso.conf"
ExecStart=/home/isso/.local/bin/isso -c $ISSO_SETTINGS run

[Install]
WantedBy=multi-user.target
```

**cat /home/isso/config/isso.conf**

```
[general]
dbpath = /home/isso/database/comments.db
host = https://sebastian.korotkiewicz.eu/

[server]
listen = http://127.0.0.1:8000/

[guard]
enabled = true
ratelimit = 2
direct-reply = 3
reply-to-self = true
require-author = true
require-email = false

[markup]
options = strikethrough, superscript, autolink, highlight, quote, underline, math, math-explicit
allowed-elements =
allowed-attributes =
```

**cat /etc/nginx/sites-enabled/comments.korotkiewicz.eu**

```
server {
        listen 80;
        listen [::]:80;
        server_name comments.korotkiewicz.eu;

        return 302 https://$server_name$request_uri;
}


server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;

        ssl        on;
        ssl_certificate         /etc/nginx/ssl/itunix.cert;
        ssl_certificate_key     /etc/nginx/ssl/itunix.key;

        server_name comments.korotkiewicz.eu;

        location / {
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_pass http://localhost:8000;
        }

}
```
