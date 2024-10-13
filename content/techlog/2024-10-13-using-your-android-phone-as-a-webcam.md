---
title: "Using your Android phone as a Webcam on Linux"
date: 2024-10-13T07:00:00+02:00
year: "2024"
month: "2024/10"
# categories:
#   - Posts
tags:
  - android
  - linux
slug: using-your-android-phone-as-a-webcam
draft: false
---

## Installing the dependencies

First of all you need to install some dependencies:

```
sudo pacman -S scrcpy dkms v4l2loopback-dkms
```

Then you need to load the module:

```
sudo modprobe v4l2loopback exclusive_caps=1
```

## Usage

# Camera Sharing

For using the front camera, first enable **usb debugging** in your phone, then connect your phone via cable and run this command in terminal:

```
scrcpy --video-source=camera --camera-size=1920x1080 --camera-facing=front --v4l2-sink=/dev/video0 --no-playback --no-window
```

For the back camera just change `--camera-facing=front` to `--camera-facing=back` .

# Testing camera

Just open obs, or run this command:

```
ffplay /dev/video0
```

# Mic sharing

For microphone you can run this command:

```
scrcpy --no-video --audio-source=mic --no-window
```

This would share your phone mic as system audio.

### Resources

- [https://wiki.parchlinux.com/en/phone-webcam](https://wiki.parchlinux.com/en/phone-webcam)
- [https://adityatelange.in/blog/android-phone-webcam-linux/](https://adityatelange.in/blog/android-phone-webcam-linux/)
