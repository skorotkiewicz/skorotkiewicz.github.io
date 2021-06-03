from datetime import datetime

MYPOST = """\
---
title: "{0}"
date: {1}
year: "{2}"
month: "{3}"
# categories:
#   - Posts
# tags:
#   - linux
slug: {4}
draft: true
---

Content

"""

if __name__ == "__main__":

    title = raw_input("Title:\n")
	
    timestamp = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
    datestamp = datetime.today().strftime("%Y-%m-%d")
    year = datetime.today().strftime("%Y")
    ym = datetime.today().strftime("%Y/%m")
    slug = "-".join(title.split(" "))

    filename = datestamp + "-" + "-".join(title.split(" ")) + ".md"
    filename = filename.lower()
	
    with open(filename, "w+") as file:
        file.write(MYPOST.format(title, timestamp, year, ym, slug))
	