---
layout: post
title: "How to add a Windows Firewall rule to enable client-to-client communication through OpenVPN"
date: 2017-12-09 23:18:20 +0200
year: "2017"
month: "2017/12"
categories:
  - Posts
tags:
  - windows
  - firewall
  - openvpn
---

Open PowerShell with Administrator Privileges and type:<br />
<small>check the path to your `openvpn.exe`!</small> <br />

```
New-NetFirewallRule -DisplayName “OpenVPN allow Inbound” -Direction Inbound -Program %ProgramFiles%\OpenVPN\bin\openvpn.exe -RemoteAddress LocalSubnet -Action Allow
New-NetFirewallRule -DisplayName “OpenVPN allow Outbound” -Direction Outbound -Program %ProgramFiles%\OpenVPN\bin\openvpn.exe -RemoteAddress LocalSubnet -Action Allow
Set-NetFirewallProfile Public -DefaultInboundAction Allow -DefaultOutboundAction Allow
```

<p>from now every connected client should be able to ping you</p>

Optional: To see if it has been added open Windows Defender Firewall: `wf.msc`.

<p>that's all<br />
Have a nice day</p>
