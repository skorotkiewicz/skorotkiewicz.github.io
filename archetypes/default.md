---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
year: "{{ now.Format "2006" }}"
month: "{{ now.Format "2006/01" }}"
# categories:
#   - Posts
# tags:
#   - linux
slug: {{ .Name }}
draft: true
---

Content
