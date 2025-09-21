---
title: "Protect forgejo with Anubis"
date: 2025-09-21T08:34:05+02:00
year: "2025"
month: "2025/09"
# categories:
#   - Posts
tags:
  - forgejo
  - nginx
  - anubis
slug: protect-forgejo-anubis-nginx
draft: false
---

```
pacman -S anubis

cp /usr/share/doc/anubis/data/botPolicies.yaml /etc/anubis/gitea.botPolicies.yaml
cp /etc/anubis/default.env /etc/anubis/forgejo.env

cat /etc/anubis/forgejo.env

BIND=:8923
DIFFICULTY=4
METRICS_BIND=:9090
SERVE_ROBOTS_TXT=0

TARGET=http://localhost:3025 # forgejo port

systemctl enable --now anubis@forgejo.service

```

```
# cat /etc/nginx/sites-enabled/git.sekor.eu.org.conf 

server {
    listen  80;
    listen  [::]:80;
    server_name git.sekor.eu.org;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name git.sekor.eu.org;

    ssl_certificate     /etc/letsencrypt/live/sekor.eu.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sekor.eu.org/privkey.pem;

    location / {
        #proxy_pass http://127.0.0.1:3025;
        proxy_pass http://127.0.0.1:8923; # anubis reverse proxy

        proxy_set_header Connection $http_connection;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Http-Version $server_protocol;

        client_max_body_size 512M;
    }
}
```

```
systemctl restart anubis@forgejo.service forgejo nginx
```