---
layout: post
title: "iptables simple ban ip rules"
date: 2012-10-18 07:14:03 +0200
year: "2012"
month: "2012/10"
hidden: false
categories:
  - Posts
tags:
  - linux
  - iptables
  - security
---

**Ban an IP address _(IP address cannot be entered on the server)_**

```
# iptables -A INPUT -s 1.2.3.4 -j DROP
```

**Ban an IP address _(cannot be accessed from the server on the IP)_**

```
# iptables -A OUTPUT -s 1.2.3.4 -j DROP
```

**Delete Rule by Chain and Number**

```
# iptables -L --line-numbers

# iptables -D INPUT 3
```

**Flush a Single Chain**  
_Delete all of the rules in the INPUT chain, run this command_

```
# iptables -F INPUT
```

**Flush All Rules, Delete All Chains, and Accept All**

```
# iptables -P INPUT ACCEPT
# iptables -P FORWARD ACCEPT
# iptables -P OUTPUT ACCEPT

# iptables -t nat -F
# iptables -t mangle -F
# iptables -F
# iptables -X
```
