---
layout: post
title: "Gitlab with Apache2 Reverse Proxy"
date: 2018-06-25 20:02:13 +0200
year: "2018"
month: "2018/06"
categories:
  - Posts
tags:
  - linux
  - gitlab
  - apache2
  - reverse
  - proxy
---

This is my config for gitlab with apache2 reverse proxy, Web IDE works!

```
<VirtualHost *:80>
        ServerName gitlab.itunix.eu
        ServerAlias gitlab.itunix.eu mt.itunix.eu www.gitlab.itunix.eu www.mt.itunix.eu
        ServerAdmin skorotkiewicz@gmail.com

        RewriteEngine on
        ReWriteCond %{SERVER_PORT} !^443$
        RewriteRule ^/(.*) https://gitlab.itunix.eu/$1 [NC,R,L]
</VirtualHost>

<VirtualHost *:443>
        ServerName gitlab.itunix.eu
        ServerAlias gitlab.itunix.eu www.gitlab.itunix.eu
        ServerAdmin skorotkiewicz@gmail.com

        ProxyPass / http://localhost:1234/ nocanon
        ProxyPassReverse / http://localhost:1234/
        ProxyPreserveHost On
        AllowEncodedSlashes NoDecode

        SSLEngine on
        SSLCertificateFile /etc/letsencrypt/live/itunix.eu-0001/cert.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/itunix.eu-0001/privkey.pem
        SSLCertificateChainFile /etc/letsencrypt/live/itunix.eu-0001/fullchain.pem

        ErrorLog /var/log/apache2/error_gitlab.log
        CustomLog /var/log/apache2/access_gitlab.log combined
</VirtualHost>
```
