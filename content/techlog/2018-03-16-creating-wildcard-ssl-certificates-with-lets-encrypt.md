---
layout: post
title: "Creating Wildcard SSL Certificates with Let’s Encrypt"
date: 2018-03-16 17:59:48 +0200
year: "2018"
month: "2018/03"
categories:
  - Posts
tags:
  - linux
  - ssl
  - wildcard
  - letsencrypt
  - certbot
---

- Install certbot:

```
wget https://dl.eff.org/certbot-auto
chmod a+x ./certbot-auto
./certbot-auto
```

- Get a certificate

```
./certbot-auto certonly \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual --preferred-challenges dns  -d *.itunix.eu
```

An important parameter to notice is `--server https://acme-v02.api.letsencrypt.org/directory`, which will instruct the certbot client to use v2 of the Let's Encrypt API (we need that for wildcard certs).

- Add DNS TXT record

```
 _acme-challenge.itunix.eu.        IN  TXT    "XXXX"
```

After add you should verify that it is working using nslookup

```
nslookup -type=TXT _acme-challenge.itunix.eu
```

When you have verified that the TXT record is properly deployed, you should see something like:

```
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/itunix.eu-0001/fullchain.pem
```

- Edit your old certificates with new Wildcard certificate (eg apache2)

```
cd /etc/apache2/sites-enabled/
sed -i 's/live\/.*.itunix.eu/live\/itunix.eu-0001/g' *.itunix.eu
```

[original article](https://blogs.msdn.microsoft.com/mihansen/2018/03/15/creating-wildcard-ssl-certificates-with-lets-encrypt/)
