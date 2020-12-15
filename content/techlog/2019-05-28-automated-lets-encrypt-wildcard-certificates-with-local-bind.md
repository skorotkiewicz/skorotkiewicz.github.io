---
layout: post
title: "Automated Let's Encrypt Wildcard Certificates with local BIND"
date: 2019-05-28 15:36:10 +0200
year: "2019"
month: "2019/05"
categories:
  - Posts
tags:
  - linux
  - letsencrypt
  - ssl
  - wildcard
  - bind
  - certificates
hidden: false
---

Let's Encrypt has recently started offering free wildcard certificates. Requirements:

1. The client must speak the ACME protocol v02 - the current Certbot >= 0.28 fulfills this, as well as
2. Authentication takes place via DNS

While other authentications (via web server, standalone, etc.) are quite easy to automate, it's a bit more difficult with DNS: For authorization you have to set a random string - given by the client - into a DNS text record, which looks like this:

`_acme-challenge TXT "i6Ll4CX2RA3fQhXXd8Sda80pcxVMmCfQRvigTBtrNOo"`

This can be entered manually without problems, but is annoying - it would be easier if this could be done automatically (as with the standalone plugin via web server). This can be done with the dynamic update mechanism via nsupdate: nsupdate dynamically changes DNS zone contents.

Unfortunately there are three problems here:

1. It is usually not possible to update a zone using nsupdate - this is especially true if the zone is with a DNS provider and
2. You don't want to put the whole zone under dynamic control because of a single entry - a manual (or script-controlled) editing of the zone file is then no longer possible.
3. Possibly, for security reasons, you don't want quite insecure test or dev systems to be able to edit around the main zone somehow.

# The solution

You create a second, dynamic zone by means of a nameserverdeligation, which is there exclusively for the -acme-challenge. This is delegated to a local bind. In my case I don't use a second BIND and delegate because of 2.), but that doesn't make any difference. The steps are as follows

**1. Adjust Zonefile**

It is delegated for the corresponding domain \_acme-challenge to another (or the same, with different zone) nameserver, in the following for the domain example.com:

`_acme-challenge IN NS ns1.example.com.`  
`_acme-challenge IN NS ns2.example.com.`

**2. Adapt local BIND**

in the named.conf:

```
zone "_acme-challenge.example.com" {
        type master;
        file "/etc/bind/dyn/_acme-challenge.example.com.zone";
        allow-query { any; };
        allow-update { localhost; };

};
```

(The zone file contains the usual data)

**3. Script for Certbot**

/etc/letsencrypt/scripts/dns-auth.sh

```
#!/bin/bash

if [ -z "$CERTBOT_DOMAIN" ] || [ -z "$CERTBOT_VALIDATION" ]
then
echo "EMPTY DOMAIN OR VALIDATION"
exit -1
fi

HOST="_acme-challenge"

/usr/bin/nsupdate << EOM
server 127.0.0.1
zone ${HOST}.${CERTBOT_DOMAIN}
update delete ${HOST}.${CERTBOT_DOMAIN} TXT
update add ${HOST}.${CERTBOT_DOMAIN} 300 TXT "${CERTBOT_VALIDATION}"
send
EOM
echo ""
```

**4. Start Certbot**

```
certbot certonly -n --manual-public-ip-logging-ok   --server https://acme-v02.api.letsencrypt.org/directory --agree-tos --manual --preferred-challenges=dns --manual-auth-hook /etc/letsencrypt/scripts/dns-auth.sh -d "*.example.com"
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for example.com
Output from dns-auth.sh:


Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com-0001/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com-0001/privkey.pem
   Your cert will expire on 2019-08-26. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

**5. Usage**

The next steps - renew - are now fully automatic. The wildcard certificate can be used too.

**6. Caveat**

The other necessary steps (setting up secondary NS, writing the initial zonefile for \_acme-challenge, using keys instead of localhost keys for authentication for nsupdate) I omitted for simplicity. These should not be a problem for anyone who has ever used zonefiles or keys in BIND. Also important: when switching to ACME V2, a new account will be generated, here you will be asked for the usual e-mail address the first time.

Otherwise it works fine now
