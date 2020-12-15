---
layout: post
title: "Quickly install openjdk-8-jre-headless on Debian without apt-get"
date: 2020-11-10 08:34:57 +0200
year: "2020"
month: "2020/11"
categories:
  - Posts
tags:
  - linux
  - openjdk
  - debian
  - java
---

Manually installation

```
wget https://github.com/ojdkbuild/contrib_jdk8u-ci/releases/download/jdk8u212-b04/jdk-8u212-ojdkbuild-linux-x64.zip \
-O /tmp/jdk-8u212-ojdkbuild-linux-x64.zip
```

```
unzip /tmp/jdk-8u212-ojdkbuild-linux-x64.zip /usr/lib/jvm/
```

```
rm /tmp/jdk-8u212-ojdkbuild-linux-x64.zip
```

Add `PATH` to your .bashrc

```
export PATH=$PATH:/usr/lib/jvm/jdk-8u212-ojdkbuild-linux-x64/jre/bin
```

Done
