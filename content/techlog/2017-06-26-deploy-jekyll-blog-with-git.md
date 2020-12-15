---
layout: post
title: "Deploy Jekyll Blog with Git"
date: 2017-06-26 00:53:58 +0200
year: "2017"
month: "2017/06"
categories:
  - Posts
tags:
  - linux
  - jekyll
  - blog
  - git
---

# Local Installation

Install jekyll
`gem install jekyll`

# Creating a Blog

Navigate to wherever you want to store your blog files on your local machine, and create a new blog like so:

`jekyll new awesomeblog`

This will create an `awesomeblog` directory containing the configuration files, posts directory and other required bits. Now you can change to that directory and fire up a server process to preview it in your browser.

```
cd awesomeblog
jekyll serve
```

Jekyll will build your blog, and after a few seconds you should be able to visit `http://localhost:4000` in your browser.

Now let's initialize a Git repository in the same directory, so any changes you make can be tracked.

```
git init
git add .
git commit -m "Initial commit"
```

# Prepare the Server

`gem install jekyll`

Second, change to your home directory and create a new "bare repository" to deploy to.

```
cd ~/
mkdir repos && cd repos
mkdir awesomeblog.git && cd awesomeblog.git
git init --bare
```

Following that, we need to set up a post-update hook. This is a shell script that Git runs when files are pushed to a repository. Create it like so:

```
cd hooks
touch post-update
nano post-update
```

Now paste in the following script, adjusting the variables accordingly.

```bash
#!/bin/bash -l
GIT_REPO=$HOME/repos/awesomeblog.git
TMP_GIT_CLONE=$HOME/tmp/git/awesomeblog
PUBLIC_WWW=/var/www/awesomeblog

git clone $GIT_REPO $TMP_GIT_CLONE
cd $TMP_GIT_CLONE
# bundle update jekyll
JEKYLL_ENV=production bundle exec jekyll build --source $TMP_GIT_CLONE --destination $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE;
exit
```

Save the file. Then give the file executable permissions.

`chmod +x post-update`

# Add a Git Remote

Back on your local machine, add a remote to your blog's Git repository.

`git remote add droplet user@example.org:repos/awesomeblog.git`

Now you should be able to push your latest commits to the server with the following command:

`git push droplet master`

Any time you make a new blog post in Jekyll, commit the changes to the Git repository and push to your Server. The cloud server will build the site and the changes will go live within seconds.

# Install ruby

`curl -L https://get.rvm.io | bash -s stable --ruby=2.0.0`
