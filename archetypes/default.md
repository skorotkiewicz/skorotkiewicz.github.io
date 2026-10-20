---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
year: "{{ (time.AsTime .Date).Format "2006" }}"
month: "{{ (time.AsTime .Date).Format "2006/01" }}"
# categories:
#   - Posts
# tags:
#   - linux
slug: {{ .Name }}
draft: true
---

Content
