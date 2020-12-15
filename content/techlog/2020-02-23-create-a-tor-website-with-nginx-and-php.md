---
layout: post
title: "Create a Tor Website with Nginx and PHP"
date: 2020-02-23 17:43:31 +0200
year: "2020"
month: "2020/02"
categories:
  - Posts
tags:
  - linux
  - tor
  - website
  - nginx
  - php
hidden: false
---

<style>li { padding-bottom: 5px; }</style>

# Step 1: Install Debian

- Prepare Debian to install https packages `sudo apt install apt-transport-https`

# Step 2: Install Nginx and PHP

- `sudo apt install nginx php7.3-fpm`
- `sudo rm /etc/nginx/sites-enabled/default`
- `sudo nano /etc/nginx/sites-enabled/default`
- Add the followings to the new `/etc/nginx/sites-enabled/default` and save:

```bash
server {
    listen 127.0.0.1:8080 default_server;
    server_name localhost;

    root /var/www/tor/public;
    index index.php index.html index.htm;
    server_tokens off;

    location / {
        allow 127.0.0.1;
        deny all;
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

# Step 3: Install Tor for the website

- `sudo nano /etc/apt/sources.list`
- You need to add the following entries to `/etc/apt/sources.list`:

```
deb https://deb.torproject.org/torproject.org buster main
deb-src https://deb.torproject.org/torproject.org buster main
```

- Go to https://www.torproject.org/docs/debian.html.en and retrive the followings:

```
gpg --keyserver keys.gnupg.net --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -
```

- Proceed with the instalation:

```
sudo apt update
sudo apt install tor deb.torproject.org-keyring
```

- Proceed with the configuration:

```
sudo nano /etc/tor/torrc
```

Replace:

```
#HiddenServiceDir /var/lib/tor/hidden_service/
#HiddenServicePort 80 127.0.0.1:80
```

With:

```
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:8080
```

# Step 4: Fire it up!

```
sudo systemctl restart tor nginx php-fpm
```

To retrive the website .onion link:

```
cat /var/lib/tor/hidden_service/hostname
```

# Step 5: Create a directory for the site and host it

```
mkdir -p /var/www/tor/public
```
