---
layout: post
title: "StopForumSpam.com -> iptables"
date: 2015-01-01 18:10:58 +0200
year: "2015"
month: "2015/01"
categories: Posts
tags:
  - linux
  - iptables
  - spam
  - firewall
---

# Start with the dependencies:

`apt-get install zip unzip ipset`

# Then add this to your existing iptables firewall script:

```
ipset create sfs_block hash:net
iptables -I FORWARD -p tcp --dport 80:443 -m set --match-set sfs_block src -j DROP
```

# Then a script that updates the ipset:

```
ipset destroy tempset
ipset create tempset hash:net
cd /tmp
wget -N http://www.stopforumspam.com/downloads/listed_ip_7.zip
unzip listed_ip_7.zip
sed 's:^:add tempset :' listed_ip_7.txt > listed_ip_7_importfile.txt
ipset restore < listed_ip_7_importfile.txt
rm listed_ip_7_importfile.txt
ipset swap tempset sfs_block
```
