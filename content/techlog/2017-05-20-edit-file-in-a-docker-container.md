---
layout: post
title: "How to edit file in a docker container?"
date: 2017-05-20 18:10:58 +0200
year: "2017"
month: "2017/05"
categories:
  - Posts
tags:
  - linux
  - docker
  - container
---

As in the comments, there's no default editor set - strange - \$EDITOR env variable is empty. You can login into container with:

`docker exec -it <container> bash`
and run:

```
apt-get update
apt-get install vim
```

or use the following Dockerfile:

```
FROM  confluent/postgres-bw:0.1

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
EDIT
```

Docker images are delivered trimmed to bare minimum - so no editor is installed with the shipped container. That's why there's a need to install it manually.
