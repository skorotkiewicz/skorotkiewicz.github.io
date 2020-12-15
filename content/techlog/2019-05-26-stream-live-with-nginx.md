---
layout: post
title: "Stream Live with Nginx"
date: 2019-05-26 22:39:51 +0200
year: "2019"
month: "2019/05"
categories:
  - Posts
tags:
  - linux
  - stream
  - live
  - nginx
hidden: false
---

# Prepare working directory

```
mkdir stream-live && cd stream-live
```

# Download nginx

Latest nginx can be downloaded from [this page](http://nginx.org/en/download.html).

```
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar -xf nginx-1.14.0.tar.gz
```

# Download modules

```
git clone https://github.com/sergey-dryabzhinsky/nginx-rtmp-module.git
git clone https://github.com/kaltura/nginx-vod-module
```

# Compile nginx

```
cd nginx-1.14.0
./configure --with-http_ssl_module --with-http_stub_status_module --add-module=/path/to/nginx-rtmp-module/ --add-module=/path/to/nginx-vod-module --prefix=/usr/local/nginx-streaming/
make -j 1
make install
```

# Configure nginx for stream video with hls via http and rtmp

`cd /usr/local/nginx-streaming/conf ; nano nginx.conf`

```
worker_processes  auto;
events {
    worker_connections  1024;
}

# RTMP configuration
rtmp {
    server {
        listen 1935; # Listen on standard RTMP port
        chunk_size 4000;

        application show {
            live on;
            record off;

            hls on;
            hls_path /mnt/hls/;
            hls_fragment 5;

            on_publish http://pass.itunix.eu:8011/auth.php;
            notify_method get;

        }
    }
}

http {
    sendfile off;
    tcp_nopush on;
    directio 512;
    default_type application/octet-stream;

    server {
        listen 8285;

        location / {
            # Disable cache
            add_header 'Cache-Control' 'no-cache';

            # CORS setup
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length';

            # allow CORS preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }

            types {
                application/dash+xml mpd;
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }

            root /mnt/;
        }

        location /stats {
            stub_status;
            access_log off;
            allow 127.0.0.1;
            deny all;
        }

    }
}
```

# OBS

my auth.php for stream obs

```
<?php

if (strpos($_GET['swfurl'], 'OurStrongPassword') !== false) {
        http_response_code(200);
        die();
} else {
        http_response_code(402);
        die();
}
?>

```

obs settings

![obs settings](/images/techlog/obs_settings.png "My OBS settings")
