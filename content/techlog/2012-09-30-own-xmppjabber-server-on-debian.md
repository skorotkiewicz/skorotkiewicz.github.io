---
layout: post
title: Own XMPP/Jabber Server on Debian
date: 2012-09-30T06:23:50+00:00
year: "2012"
month: "2012/09"
categories:
  - Posts
tags:
  - xmpp
  - linux
  - debian
  - jabber
---

1. Installing ejab­berd:

```
aptitude install ejabberd
```

2. Configuration:

```
nano /etc/ejabberd/ejabberd.cfg
```

3. Find and change the line:

```
{acl, admin, {user, "YOURNAME", "YOURDOMAIN"}}.
```

4. Append a little below your domain:

```
{hosts, ["YOURDOMAIN"]}.
```

5. Restart ejabberd:

```
ejabberdctl restart
```

6. Register an account for yourself:

```
ejabberdctl register YOURNAME YOURDOMAIN YOURPASSWORD
```

7. If the ejabberd is on a different server set SRV records:

```
jid.YOURDOMAIN.TLD. A IPSERVEREJABBERD
_xmpp-client._tcp.YOURDOMAIN.TLD. SRV 10 0 5222 jid.YOURDOMAIN.TLD.
_xmpp-server._tcp.YOURDOMAIN.TLD. SRV 10 0 5269 jid.YOURDOMAIN.TLD.
```
