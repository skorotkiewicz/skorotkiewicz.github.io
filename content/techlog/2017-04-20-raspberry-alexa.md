---
layout: post
title: "Raspberry Alexa"
date: 2017-04-20 18:10:58 +0200
year: "2017"
month: "2017/04"
categories:
  - Posts
tags:
  - linux
  - raspberry
  - alexa
  - amazon
---

```
sudo raspi-config

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install git

git clone git://git.drogon.net/wiringPi

cd wiringPi
./build

cd ~

git clone https://github.com/alexa/alexa-avs-sample-app.git

cd alexa-avs-sample-app

nano automated_install.sh

. automated_install.sh

cd ~

cd alexa-avs-sample-app/samples/companionService
npm start
```

# Second window

```
cd alexa-avs-sample-app/samples/javaclient
mvn exec:exec
```

# Third window

```
cd alexa-avs-sample-app/samples/wakeWordAgent/src
./wakeWordAgent -e sensory
```
