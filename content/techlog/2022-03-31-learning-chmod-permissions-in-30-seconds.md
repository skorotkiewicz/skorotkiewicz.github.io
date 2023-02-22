---
title: "Learning Chmod Permissions in 30 Seconds"
date: 2022-03-31T18:05:52+02:00
year: "2022"
month: "2022/03"
# categories:
#   - Posts
tags:
  - linux
  - chmod
  - permissions
slug: learning-chmod-permissions-in-30-seconds
draft: false
---

## Scary about "drwxr-xr-x"?

Don't worry, in 30 seconds you'll be able to read it!

Chmod always contains three groups, the first is _`(u)ser`_, then _`(g)roup`_ and finally _`(o)ther (public)`_

```
-|rw-|r--|r-x
 | 1 | 2 | 3
 | u | g | o
```

1. (`u`)ser: user can (`r`)ead and (`w`)rite
2. (`g`)roup: user in this same group can (`r`)ead.
3. (`o`)thers/public: can (`r`)ead and e(`x`)ecute.

```txt
U = User            (1)
G = Group           (2)
O = Other (Public)  (3)

R = Read
W = Write
X = Execute
```

### Give permisions:

`chmod ugo+rwx hey.txt`

This add permissions to (`u`)ser, (`g`)roup and (`o`)ther to (`r`)ead, (`w`)rite and e(`x`)ecute file `hey.txt`.

`chmod o-r hey.txt`

This remove permision for (`o`)ther to (`r`)ead.

---

## Meaning

Now you can read what means "`-rwxr-xr--`".

Yes! It's.

- (`u`)ser can (`r`)ead, (`w`)rite and e(`x`)ecute.
- (`g`)rupe can (`r`)ead and e(`x`)ecute.
- (`o`)ther can only (`r`)ead.

Remeber: `-rwx|r-x|r--`  
Linux have always 3 groups : (`u`)ser, (`g`)rups, (`o`)ther!

- You can give access to `u`, `g` and `o`.
- You can give access to (`r`)ead, (`w`)rite, and e(`x`)ecute.

You gave access by adding plus sign (`+`)

- you gave (`u`)ser access to (`r`)ead and (`w`)rite to file hello.  
  `chmod u+rw hello`

- you remove (`u`)ser access to (`r`)ead and (`w`)rite to file hello.  
  `chmod u-rw hello`

# ---

```
drwxr-xr-x
```

first letter are type of file.

d = directory.

That's it.
