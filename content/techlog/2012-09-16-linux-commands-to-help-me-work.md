---
layout: post
title: Linux commands to help me work
date: 2012-09-16T09:57:49+00:00
year: "2012"
month: "2012/09"
categories:
  - Posts
tags:
  - linux
  - iptables
---

Search for files and directories given text

```
grep -i -n -r 'Search string' /var/www/path/
```

Shows how many times is the search text in the text and returns the result in numbers.

```
cat access.log|grep 'Search string' | wc -l
```

Remove all .gz from /var/log/

```
find /var/log/ -name "*.gz" -type f -delete
```

Find and replace text in all files in a directory

```
find ./ -type f -exec sed -i 's/string1/string2/g' {} \;

find /var/log/ -type f -exec sed -i 's/string1/string2/g' {} \;
```

Unpack tar files

```
tar -xJfv file.tar.xz
tar -xvf file.tar.bz2
```

while

```
while true; do COMMEND; done
```

Nice example for "for" renaming files

```bash
#!/bin/bash
shopt -s extglob
for A in *.mp3; do
   B=${A/%-+([[:alnum:]_]).mp3/.mp3}
   [[ $A != "$B" ]] && mv "$A" "$B"
done
```

Thanks [konsolebox](https://stackoverflow.com/a/24165422)
