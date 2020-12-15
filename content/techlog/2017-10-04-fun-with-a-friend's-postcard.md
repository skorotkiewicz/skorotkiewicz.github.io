---
layout: post
title: "fun with a friend's postcard"
date: 2017-10-04 17:08:44 +0200
year: "2017"
month: "2017/10"
categories:
  - Posts
tags:
  - linux
  - zlib
  - encryption
  - decryption
  - hex
---

# encryption of the message into zlib

```python
from codecs import encode
from functools import reduce

print reduce(encode, ('utf8', 'zlib', 'hex'), "this is my message on the postcard")
#output: 789c2bc9c82c5600a2dc4a85dcd4e2e2c4f45485fc3c85928c548582fce292e4c4a21400da1a0c9e
```

output hex, save to file post.txt

```
78 9c 2b c9 c8 2c 56 00 a2 dc 4a
85 dc d4 e2 e2 c4 f4 54 85 fc 3c
85 92 8c 54 85 82 fc e2 92 e4 c4
a2 14 00 da 1a 0c 9e
```

# decryption of the message

```python
d = open("post.txt", "r").read().strip()
d = d.replace("\n", " ").split(" ")
d = bytearray([int(x, 16) for x in d])
open("post.bin", "wb").write(d)
```

# decryption

```python
open("post.bin", "rb").read().decode("zlib")
# output: 'this is my message on the postcard'
```
