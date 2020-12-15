---
layout: post
title: "Rename a part of filename of a bunch of files"
date: 2018-01-19 15:08:37 +0200
year: "2018"
month: "2018/01"
categories:
  - Posts
tags:
  - linux
  - files
  - rename
---

## Example

```bash
$ ls -l
AndroidTest.pdf
Angular2Test.pdf
BashTest.pdf
```

### The simplest way to remove 'Test' from any files:

```bash
rename 's/Test//g' *.pdf
```

```bash
$ ls -l
Android.pdf
Angular2.pdf
Bash.pdf
```

### Or change 'Test' to 'Hello'

```bash
rename 's/Test/Hello/g' *.pdf
```

```bash
$ ls -l
AndroidTest.pdf
Angular2Test.pdf
BashTest.pdf
```
