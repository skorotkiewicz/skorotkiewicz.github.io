---
layout: post
title: "Switch PHP version"
date: 2018-01-10 02:29:44 +0200
year: "2018"
month: "2018/01"
categories:
  - Posts
tags:
  - linux
  - php
  - apache
---

### From php5.6 to php7.0:

Apache:

```bash
sudo a2dismod php5.6 ; sudo a2enmod php7.0 ; sudo service apache2 restart
```

CLI:

```bash
sudo update-alternatives --set php /usr/bin/php7.0
```

### From php7.0 to php5.6:

Apache:

```bash
sudo a2dismod php7.0 ; sudo a2enmod php5.6 ; sudo service apache2 restart
```

CLI:

```bash
sudo update-alternatives --set php /usr/bin/php5.6
```
