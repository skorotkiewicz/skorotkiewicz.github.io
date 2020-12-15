---
layout: post
title: "Fix GitLab is taking too much time to respond. 502 Error"
date: 2018-06-09 19:23:43 +0200
year: "2018"
month: "2018/06"
categories:
  - Posts
tags:
  - linux
  - gitlab
---

Solution by <a href="https://github.com/sameersbn/docker-gitlab/issues/1016#issuecomment-267874006">iamchanghyunpark</a>

"I checked the pid value in the log and checked if there was a running process with the same pid, and no there was none.<br />
I'm guessing this is because of the unexpected powerdown, and unicorn.pid was not properly cleared.<br />
My solution was simple"

```
docker-compose exec gitlab bash
vi log/unicorn.stderr.log # remove the value (which is the pid), save and exit
exit # from the bash shell of the gitlab container

#Now restart the containers
docker-compose down
docker-compose up -d
```
