---
layout: post
title: "Stream VoD with Nginx"
date: 2019-02-09 19:57:34 +0200
year: "2019"
month: "2019/02"
categories:
  - Posts
tags:
  - linux
  - stream
  - vod
  - nginx
hidden: false
---

# Prepare working directory

```
mkdir stream && cd stream
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
./configure --with-http_ssl_module --add-module=/path/to/nginx-rtmp-module/ --add-module=/path/to/nginx-vod-module --prefix=/usr/local/nginx-streaming/
make -j 1
make install
```

# Configure nginx for stream video files with hls via http

`cd /usr/local/nginx-streaming/conf ; nano nginx.conf`

```bash
worker_processes  auto;

events {
	use epoll;
}

#enable stream vod on rtmp if you want this
#rtmp {
#    server {
#        listen 1935;
#
#        chunk_size 4000;
#
#        # video on demand for mp4 files
#        application vod2 {
#            play /var/mp4s;
#        }
#    }
#}

http {
	log_format  main  '$remote_addr $remote_user [$time_local] "$request" '
		'$status "$http_referer" "$http_user_agent"';

	default_type  application/octet-stream;
	include       /usr/local/nginx-streaming/conf/mime.types;

	sendfile    on;
	tcp_nopush  on;
	tcp_nodelay on;

	vod_mode                           local;
	vod_metadata_cache                 metadata_cache 16m;
	vod_response_cache                 response_cache 512m;
	vod_last_modified_types            *;
	vod_segment_duration               9000;
	vod_align_segments_to_key_frames   on;
	vod_dash_fragment_file_name_prefix "segment";
	vod_hls_segment_file_name_prefix   "segment";

	vod_manifest_segment_durations_mode accurate;

	open_file_cache          max=1000 inactive=5m;
	open_file_cache_valid    2m;
	open_file_cache_min_uses 1;
	open_file_cache_errors   on;

	#aio on;

	server {
		listen 8080;

		location /hls/ {
			vod hls;
			alias /path/to/your/videos/;
			add_header Access-Control-Allow-Headers '*';
			add_header Access-Control-Allow-Origin '*';
			add_header Access-Control-Allow-Methods 'GET, HEAD, OPTIONS';
		}

	}
}
```

# Start/kill nginx

```
/usr/local/nginx-streaming/sbin/nginx
/usr/local/nginx-streaming/sbin/nginx -s stop
```

If you want to stream to your server, here is good [documentation](https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/)
