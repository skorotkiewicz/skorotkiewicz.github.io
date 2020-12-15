---
layout: post
title: "Create user, datebase and grant permission in MySQL/PostgreSQL"
date: 2018-09-08 20:14:53 +0200
year: "2018"
month: "2018/09"
categories:
  - Posts
tags:
  - linux
  - datebase
  - mysql
  - postgresql
---

## MySQL

1.Login to MySQL

```
mysql -u root -p
```

2.Create new user

```
CREATE USER 'forum'@'localhost' IDENTIFIED BY 'password';
```

3.Create datebase for user

```
CREATE DATABASE forum;
```

4.Grant all permission for user datebase

```
GRANT ALL PRIVILEGES ON forum.* TO 'forum'@'localhost';
```

## PostgreSQL

1.Creating user

```
sudo -u postgres createuser <username>
```

2.Creating Database

```
sudo -u postgres createdb <dbname>
```

3.Giving the user a password

```
sudo -u postgres psql
psql=# alter user <username> with encrypted password '<password>';
```

4.Granting privileges on database

```
psql=# grant all privileges on database <dbname> to <username> ;
```

## Export / Import a PostgreSQL database

```
# pg_dump -C -h localhost -U USERNAME DBNAME > dbexport.pgsql
# psql -h localhost -U USERNAME DBNAME < dbexport.pgsql

# docker exec CONTAINER pg_dump -C -h localhost -U USERNAME DBNAME > dbexport.sql
```
