---
layout: post
title: "nginx + cgit + debian = one host"
date: 2017-01-20 18:10:58 +0200
year: "2017"
month: "2017/01"
categories:
  - Posts
tags:
  - linux
  - nginx
  - cgit
  - debian
---

```
root@raspberrypi:/var/www# cat /etc/nginx/sites-enabled/www
server {

    listen 80;
    server_name home.control;

    root /var/www;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
        autoindex on;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location /git {
        gzip off;
        alias /usr/local/cgit/share;
        try_files $uri @cgit;
    }

    location @cgit {
        fastcgi_pass   unix:/tmp/cgi.sock;

        fastcgi_param  QUERY_STRING       $query_string;
        fastcgi_param  REQUEST_METHOD     $request_method;
        fastcgi_param  CONTENT_TYPE       $content_type;
        fastcgi_param  CONTENT_LENGTH     $content_length;

        fastcgi_param  REQUEST_URI        $request_uri;
        fastcgi_param  DOCUMENT_URI       $document_uri;
        fastcgi_param  SERVER_PROTOCOL    $server_protocol;

        fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
        fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;

        fastcgi_param  REMOTE_ADDR        $remote_addr;
        fastcgi_param  REMOTE_PORT        $remote_port;
        fastcgi_param  SERVER_ADDR        $server_addr;
        fastcgi_param  SERVER_PORT        $server_port;
        fastcgi_param  SERVER_NAME        $server_name;

        # Tell nginx to consider everything after /git as PATH_INFO. This way
        # we get nice, clean URLs
        fastcgi_split_path_info           ^(/git)(/?.+)$;

        # Unfortunately the version of fcgiwrap currently available in Debian
        # squeeze removes the PATH_INFO variable from the CGI environment and
        # sets a new one based on DOCUMENT_ROOT and SCRIPT_NAME, so the line
        # below wont work
        #fastcgi_param  PATH_INFO         $fastcgi_path_info;
        # Tell fcgiwrap about the binary wed like to execute and cgit about
        # the path wed like to access.
        fastcgi_param  SCRIPT_NAME        /cgit.cgi$fastcgi_path_info;
        fastcgi_param  DOCUMENT_ROOT      /usr/local/cgit/bin;
    }

    #ssl_certificate /etc/nginx/ssl/nginx.crt;
    #ssl_certificate_key /etc/nginx/ssl/nginx.key;
}
```
