---
title: "How to warn ESLint on TODO/FIXME/XXX"
date: 2022-02-24T09:40:31+01:00
year: "2022"
month: "2022/02"
# categories:
#   - Posts
# tags:
#   - linux
slug: xxx-eslint
draft: false
---

Hmm, simple add to `.eslintrc.js` no-warning-comments.

My config:

```
module.exports = {
  extends: ["blitz"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-empty": "off",
    "no-warning-comments": ["warn", { terms: ["todo", "fixme", "xxx"], location: "anywhere" }],
  },
}

```
