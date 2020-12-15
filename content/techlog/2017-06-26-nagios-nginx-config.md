---
layout: post
title: "Nagios with Nginx"
date: 2017-06-26 18:10:58 +0200
year: "2017"
month: "2017/06"
categories:
  - Posts
tags:
  - linux
  - nagios
  - nginx
---

```bash
server {
	listen 80;
	server_name  my.example.com;

	access_log  /var/log/nginx/nagios.access.log;
	error_log   /var/log/nginx/nagios.error.log info;

	expires 31d;

	#rewrite ^/nagios3/(.*)$ /$1 break;
	rewrite ^/nagios3/(.*)$ /$1;

	root /usr/share/nagios3/htdocs;
	index index.php index.html;

        auth_basic "Nagios Restricted Access";
        auth_basic_user_file /etc/nagios3/htpasswd.users;

	location /stylesheets {
		alias /etc/nagios3/stylesheets;
	}

        location ~ \.cgi$ {
		root /usr/lib/cgi-bin/nagios3;

		rewrite ^/cgi-bin/nagios3/(.*)$ /$1;

		include /etc/nginx/fastcgi_params;

		fastcgi_param AUTH_USER $remote_user;
                fastcgi_param REMOTE_USER $remote_user;
                fastcgi_param SCRIPT_FILENAME /usr/lib/cgi-bin/nagios3$fastcgi_script_name;

		fastcgi_pass unix:/var/run/fcgiwrap.socket;
        }

	location ~ \.php$ {
		try_files $uri =404;
		fastcgi_split_path_info ^(.+\.php)(/.+)$;
		fastcgi_pass unix:/var/run/php5-fpm.sock;
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
	}
}
```

**edit**  
my new config:

```bash
server {
	listen 80;
	server_name my.example.com www.my.example.com;

	access_log /var/log/nginx/nagios-access.log;
	error_log /var/log/nginx/nagios-error.log info;

	auth_basic "Nagios Restricted Access";
	auth_basic_user_file /usr/local/nagios/etc/htpasswd.users;

	root /usr/local/nagios/share;
	index index.php;

	location / {
			try_files $uri $uri/ index.php /nagios;
	}

	location /nagios {
		alias /usr/local/nagios/share;
		location ~ \.php$ {
				include snippets/fastcgi-php.conf;
				fastcgi_param SCRIPT_FILENAME $request_filename;
				fastcgi_param AUTH_USER $remote_user;
				fastcgi_param REMOTE_USER $remote_user;
				fastcgi_pass unix:/run/php/php7.0-fpm.sock;
		}
		location ~ \.cgi$ {
				root /usr/local/nagios/sbin;
				rewrite ^/nagios/cgi-bin/(.*)\.cgi /$1.cgi break;
				include /etc/nginx/fastcgi_params;
				fastcgi_param SCRIPT_FILENAME $request_filename;
				fastcgi_param AUTH_USER $remote_user;
				fastcgi_param REMOTE_USER $remote_user;
				fastcgi_pass unix:/var/run/fcgiwrap.socket;
		}
	}

	location ~ \.php$ {
			include snippets/fastcgi-php.conf;
			fastcgi_pass unix:/run/php/php7.0-fpm.sock;
	}
}
```
