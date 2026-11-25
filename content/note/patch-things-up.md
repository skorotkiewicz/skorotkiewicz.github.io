---
title: "patch things up"
date: 2026-11-25T16:12:28+00:00
year: "2026"
month: "2025/11"
# categories:
#   - Posts
tags:
  - diff
  - patch
  - git
  - repo
slug: patch-things-up
draft: false
---

```sh
# create a patch (pick one)
git diff src/style.css > my.patch                   # uncommitted changes
git diff HEAD~1 -- src/style.css > my.patch         # vs previous commit
git diff origin/main -- src/style.css > my.patch    # vs GitHub

# without git: needs a copy of the original
cp src/style.css /tmp/style.orig                    # back up BEFORE editing
# edit src/style.css
diff -u /tmp/style.orig src/style.css > my.patch
# diff -u --label a/src/style.css --label b/src/style.css /tmp/style.orig src/style.css > my.patch

# apply / revert (run from the project root)
patch -p1 --dry-run < my.patch    # test first
patch -p1 < my.patch              # apply
patch -p1 -R < my.patch           # revert

# or with git
git apply --check my.patch
git apply my.patch
git apply -R my.patch             # revert
```
