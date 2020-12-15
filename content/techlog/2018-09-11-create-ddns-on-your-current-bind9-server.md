---
layout: post
title: "Create ddns on your current bind9 server"
date: 2018-09-11 22:09:57 +0200
year: "2018"
month: "2018/09"
categories:
  - Posts
tags:
  - linux
  - ddns
  - bind9
  - dns
---

# Tasks.

We have example.com server with bing9 server.  
At home we have a server with dynamic IP.  
Pin the dynamic IP to your own server. -> home.example.com

## Server

The document asserts a working BIND setup already in place. Installing and configuring BIND is out of scope here.

# Creating a key-pair

To create a key-pair, we'll be using dnssec-keygen.

```bash
server$ dnssec-keygen -a HMAC-SHA512 -b 512 -n USER home.example.com.
```

This creates two files, which will be named differently based on individual runs.

```bash
server$ file Khome.example.com.+157+62567.*
Khome.example.com.+157+62567.key:     ASCII text
Khome.example.com.+157+62567.private: ASCII text
```

Notice that the `Key:` field in the .private file is simply the concatenated key from the .key file.

# Key File

Next created a key file at `/etc/bind/keys.conf`.

```bash
key home.example.com. {
    algorithm HMAC-SHA512;
    secret "Mprj8I76jDiEldj3SgF7/Ph5bWm4eHYZu0nOcUB1vT4wU5PjbYNnp8T9 cb8XqmE0ANotnw+FBBbr3lA8O5uJ8A==";
};
```

Then add the following line to `/etc/bind/named.conf.local` to include the new key.

```bash
include "/etc/bind/keys.conf";
```

# Dynamic Zone

The key is situated on the server, all that remains is to add a zone for BIND. This is my entry further down in `/etc/bind/named.conf.local`:

```bash
zone "home.example.com" {
    type master;
    file "/etc/bind/dyndns/home.example.com";
    update-policy {
      grant home.example.com. name home.example.com. A TXT;
    };
};
```

We have to create the directory `/etc/bind/dyndns`, give bind permission to write to it, and place the zone `home.example.com` there.

```bash
server$ sudo mkdir /etc/bind/dyndns
server$ sudo chgrp bind /etc/bind/dyndns
server$ sudo chmod g+w /etc/bind/dyndns
```

Lastly put the `/etc/bind/dyndns/home.example.com` file into place.

```bash
$ORIGIN .
$TTL 14400      ; 4 hours
home.example.com         IN SOA  ns1.example.com. root.example.com. (
                                9          ; serial
                                604800     ; refresh (1 week)
                                86400      ; retry (1 day)
                                2419200    ; expire (4 weeks)
                                604800     ; minimum (1 week)
                                )
                        NS      ns1.example.com.
```

Restart BIND with a simple `service bind9 restart` and it's time for the client side.

## Client

First transfer the .key and .private files down to the client system via your transport mechanism of choice. Once situated, `chmod` each file to `0400`.

```bash
-r-------- 1 user user 128 Jan 26 17:58 Khome.example.com.+157+62567.key
-r-------- 1 user user 229 Jan 26 17:58 Khome.example.com.+157+62567.private
```

# Update Script

The `nsupdate` tool in the <s>`dnsutils`</s>`ddns-scripts_nsupdate` package will perform the update. I wrote a simple wrapper script in bash to run the update for me.

```bash
#!/bin/bash
# -----------------------------------------------------------
# update the dynamic dns for home system
#
# usage: do-nsupdate
# -----------------------------------------------------------

EXT_IP=$(wget -qO- http://ifconfig.co/ip)
KEY="/path/to/Khome.example.com.+157+62567.private"

cat <<EOF | nsupdate -k "$KEY"
server example.com
zone example.com
update delete home.example.com. A
update add home.example.com. 600 A $EXT_IP
show
send
EOF
```

Running the `do-nsupdate` script manually will show whether everything is working correctly.

# Sources

- https://github.com/int0x80/notes/wiki/Linux:-Dynamic-DNS-with-BIND-and-DNSSEC
- https://dnns.no/dynamic-dns-with-bind-and-nsupdate.html
