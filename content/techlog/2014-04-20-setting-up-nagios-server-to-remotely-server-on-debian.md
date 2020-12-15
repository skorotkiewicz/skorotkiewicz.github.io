---
layout: post
title: Setting up Nagios Server to Remotely Server on Debian
date: 2014-04-20T23:03:59+00:00
year: "2014"
month: "2014/04"
categories:
  - Posts
tags:
  - linux
  - nagios
  - debian
---

**Step 1. Installing packages**

We have one server for monitoring (eg. myoneserver). **[client]**

```
# aptitude install nagios-nrpe-server nagios-plugins
```

And one server to view statistics. **[server]**

```
# aptitude install nagios-nrpe-plugin nagios-plugins nagios3
```

**Step 2. Configuring the server for monitoring [client]**  
Edit /etc/nagios/nrpe.conf.

```
# nano /etc/nagios/nrpe.conf
```

Set the server_address to the IP address you want NRPE to bind to on the Untangle server.  If you want it to bind to all addresses, leave this command commented out.

```
server_address=10.0.0.1
```

Change allowed_hosts to the IP address of the Nagios server:

```
allowed_hosts=10.0.0.20
```

Add a command to check the swap utilization:

```
command[check_sda1]=/usr/lib/nagios/plugins/check_disk -w 20% -c 10% -p /dev/sda1
```

Save and quit /etc/nagios/nrpe.conf.

Restart the NRPE service:

```
/etc/init.d/nagios-nrpe-server restart
```

**Step 3. Configure the Nagios Server**  
Create a file named /etc/nagios3/conf.d/myoneserver.cfg with the following contents:

```
#Host Definition
define host{
use                     generic-host
host_name               myoneserver
alias                   MyOneServer Server
address                 10.0.0.1
}

# Service Definitions
define service{
use                     generic-service
host_name               myoneserver
service_description     CPU Load
check_command           check_nrpe_1arg!check_load
}

define service{
use                     generic-service
host_name               myoneserver
service_description     Swap Drive Usage
check_command           check_nrpe_1arg!check_swap
}

define service{
use                     generic-service
host_name               myoneserver
service_description     Free Disk Space
check_command           check_nrpe_1arg!check_sda1
}

define service{
use                     generic-service
host_name               myoneserver
service_description     Number of Users
check_command           check_nrpe_1arg!check_users
}

define service{
use                     generic-service
host_name               myoneserver
service_description     Number of Zombie Processes
check_command           check_nrpe_1arg!check_zombie_procs
}

define service{
use                     generic-service
host_name               myoneserver
service_description     Total Processes
check_command           check_nrpe_1arg!check_total_procs
}
```

Save and quit  /etc/nagios3/conf.d/myoneserver.cfg.

Edit /etc/nagios3/conf.d/hostgroups_nagios2.cfg and add the following section to define an

```
Server group. (optional)
define hostgroup {
hostgroup_name  myoneserver
alias           MyOneServer Servers
members         MyOneServer1, MyOneServer2 MyOneServer3
}

```

Restart the Nagios service to apply the changes:

```
/etc/init.d/nagios3 restart
```
