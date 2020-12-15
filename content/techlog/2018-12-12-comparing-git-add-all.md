---
layout: post
title: "Compare `git add .` vs `git add -A`"
date: 2018-12-12 06:11:23 +0200
year: "2018"
month: "2018/12"
categories:
  - Posts
tags:
  - git
---

Both of these will stage all files, including new files (which `git commit -a` misses) and deleted files.

The difference is that `git add -A` also stages files in higher directories that still belong to the same git repository. Here's an example:

```
/my-repo
  .git/
  subfolder/
    nestedfile.txt
  rootfile.txt
```

If your current working directory is `/my-repo`, and that's the root of this git repo (thus the `.git/` folder), these two commands will do the same thing.  
But if you `rm rootfile.txt`, then `cd subfolder`, `git add .` will not stage the change that `../rootfile.txt` has been deleted, because `git add .` only affects the current directory and subdirectories. `git add -A`, on the other hand, will stage this change.
