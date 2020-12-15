---
layout: post
title: "PHP Security - disabled the exec, etc."
date: 2012-09-30T08:05:06+00:00
year: "2012"
month: "2012/09"
categories:
  - Posts
tags:
  - linux
  - php
  - security
---

In /etc/php5/apache2/**php.ini**

as someone already can upload phpshell it will not do too much&#8230;

```
disable_functions = exec, shell_exec, system, popen, passthru, escapeshellarg, escapeshellcmd, proc_close, proc_open, ini_alter, dl, popen, show_source, set_time_limit, php_uname, phpinfo, diskfreespace, disk_total_space, disk_free_space, get_current_user, posix_uname
```

&nbsp;
