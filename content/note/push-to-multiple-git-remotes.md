---
title: "Push to multiple git remotes with one command"
date: 2026-10-20T22:39:21+00:00
year: "2026"
month: "2026/10"
# categories:
#   - Posts
tags:
  - git
  - cheat
  - sheet
slug: push-to-multiple-git-remotes
draft: false
---

**Push to multiple git remotes with one command**

I keep my main repo on a self-hosted server and mirror it to GitHub. Two remotes, one command.

**1. Add the remotes**

```bash
git remote add aurcade ssh://git@myserver.org:2222/user/repo.git
git remote add github git@github.com:user/repo.git
git remote -v   # check
```

**2. Add an alias**

In `.git/config` (this repo only) or `~/.gitconfig` (all repos):

```ini
[alias]
        pushall = "!git push aurcade && git push github"
```

Now `git pushall` pushes to both. The alias even shows up in tab completion.

**3. Set a default upstream**

```bash
git branch -u aurcade/main
```

so plain `git push` and `git pull` work too.

**Notes**

- `&&` stops at the first failure, so GitHub only gets the push if my server succeeded. Use `;` if you want both attempted regardless.
- Each remote needs its own fetch namespace, like `+refs/heads/*:refs/remotes/github/*`. `git remote add` sets this correctly. If you edit by hand, don't point two remotes at `refs/remotes/origin/*`, or fetches will overwrite each other.
- Pushing sends commits only, so commit first.
- Push tags too with `git push <remote> --tags`.
