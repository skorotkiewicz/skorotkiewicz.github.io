---
layout: post
title: "Install Searx on Apache2 and uWSGI"
date: 2019-10-09 04:03:39 +0200
year: "2019"
month: "2019/10"
categories:
  - Posts
tags:
  - linux
  - searx
  - apache2
  - uwsgi
  - python
hidden: false
---

# uwsgi

Install packages:

```
sudo apt-get install uwsgi uwsgi-plugin-python
```

Add searx user:

```
useradd searx
```

Create the configuration file `/etc/uwsgi/apps-enabled/searx.ini` with this content:

```ini
[uwsgi]
# Who will run the code
uid = searx
gid = searx

# Number of workers (usually CPU count)
workers = 4

# The right granted on the created socket
chmod-socket = 666

# Plugin to use and interpretor config
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = true

# Module to import
module = searx.webapp

# Virtualenv and python path
pythonpath = /var/sites/searx/
chdir = /var/sites/searx/searx/

# Disable logging for privacy
disable-logging=True

# But keep errors for 2 days
touch-logrotate = /run/uwsgi-logrotate
unique-cron = 15 0 -1 -1 -1 { touch /run/uwsgi-logrotate  }
log-backupname = /var/log/uwsgi/uwsgi.log.1
logto = /var/log/uwsgi/uwsgi.log
```

# Web server

Add wsgi mod:

```
sudo apt install libapache2-mod-uwsgi
sudo a2enmod uwsgi
```

VirtualHost for Apache with SSL

```
<VirtualHost *:80>
        ServerName searx.itunix.eu
        ServerAlias searx.itunix.eu www.searx.itunix.eu
        ServerAdmin skorotkiewicz@gmail.com

        RewriteEngine on
        ReWriteCond %{SERVER_PORT} !^443$
        RewriteRule ^/(.*) https://%{HTTP_HOST}/$1 [NC,R,L]
</VirtualHost>

<VirtualHost *:443>
        ServerName searx.itunix.eu
        ServerAlias searx.itunix.eu www.searx.itunix.eu
        ServerAdmin skorotkiewicz@gmail.com

        <Location />
            Options FollowSymLinks Indexes
            SetHandler uwsgi-handler
            uWSGISocket /run/uwsgi/app/searx/socket
        </Location>

        SSLEngine on
        SSLCertificateFile /etc/letsencrypt/itunix.eu/cert.pem
        SSLCertificateKeyFile /etc/letsencrypt/itunix.eu/privkey.pem
        SSLCertificateChainFile /etc/letsencrypt/itunix.eu/fullchain.pem

        ErrorLog /var/log/apache2/error_searx.log
        CustomLog /var/log/apache2/access_searx.log combined
</VirtualHost>
```
