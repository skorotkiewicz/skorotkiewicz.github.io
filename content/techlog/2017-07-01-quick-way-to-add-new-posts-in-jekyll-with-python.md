---
layout: post
title: "Quick way to add new posts in Jekyll with Python"
date: 2017-07-01 00:54:18 +0200
year: "2017"
month: "2017/07"
categories:
  - Posts
tags:
  - linux
  - python
  - jekyll
---

To make life a little easier

```python
from datetime import datetime

MYPOST = """\
---
layout: post
title: "{0}"
date: {1} +0200
categories: {2}
---

here my text
"""

if __name__ == "__main__":

    title = raw_input("Title:\n")
    categories = raw_input("Categories:\n")

    if not categories:
        categories = "posts"

    timestamp = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
    datestamp = datetime.today().strftime("%Y-%m-%d")

    filename = datestamp + "-" + "-".join(title.split(" ")) + ".md"
    filename = filename.lower()

    with open(filename, "w+") as file:
        file.write(MYPOST.format(title, timestamp, categories))

```
