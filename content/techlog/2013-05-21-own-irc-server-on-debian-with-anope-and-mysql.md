---
layout: post
title: Own IRC Server on Debian with Anope and MySQL
date: 2013-05-21T12:54:51+00:00
year: "2013"
month: "2013/05"
categories: Posts
tags:
  - irc
  - anope
  - mysql
---

**\*\* Pre-Installation \*\***

First, download the UnrealIRCd source, located [here](http://www.unrealircd.com/ "here")

```
wget http://www.unrealircd.com/downloads/Unreal3.2.10.1.tar.gz
wget http://www.unrealircd.com/pgp/Unreal3.2.10.1.tar.gz.asc
```

After you install it, run a few checks on the gzip file to make sure it is the secured version.

```
gpg --keyserver keys.gnupg.net --recv-keys 0x9FF03937
gpg --verify Unreal3.2.10.1.tar.gz.asc Unreal3.2.10.1.tar.gz
```

Next, we have to extract the contents of the compressed file. Type

```
tar zxvf Unreal3.2.10.1.tar.gz
```

\*\* SSL Support

If you want users to be able to connect to your IRC server via a secure connection, you will need to install a package called libcurl4-openssl-dev. This is a bundle that includes everything needed for SSL, plus what is needed for remote includes which are discussed below.

You will need to install the packages as root. Type these:

```
apt-get install build-essential
apt-get install openssl
apt-get install libcurl4-openssl-dev
```

You now have what is required for SSL connections to your server.

\*\*Ziplinks Support

Ziplinks reduce the amount of bandwidth used by your servers by compressing data before it is sent to another server.  
zlib1g is the library required for ziplinks, which is usually installed already, so you don't have to do anything.

\*\* Remote Includes Support

A remote include is pretty much like a normal include, the difference being that remote includes are obtained from a remote FTP server. This makes it so there could be one central FTP server with most of the configuration files that are not server-specific. This will make updates to the configuration files much easier, since you only have to update the files on the FTP server, then rehash all of the IRC servers.

For remote include support, we will need libcurl, which is already installed with the libcurl4-openssl-dev package above.

\*\* Installation \*\*  
We are now ready to install UnrealIRCd. Switch back to the account that you will be installing UnrealIRCd on, and navigate to the Unreal3.2 folder. Type:

./Config

&#8230; answers to questions that ask configurator &#8230;  
with SSL support!  
And type `make`

**\*\* Anope \*\***  
Download [Anope](http://www.anope.org/ "Anope") Services.

Decompress them  
tar zxvf anope-1.8.8.tar.gz

Change to anope directory and start the installation:  
cd anope-1.8.8  
./Config

Configuration answers:

```
install binaries to? I suggest /path/to/Unreal3.2.10.1/services
create dir? yes
install data files to? hit enter
group? hit enter
default umask? hit emter
MD5 passwd encryption? no (unless you really want it)
auto-check for mysql libs? hit enter
```

Type make and make install to complete the compilation process  
When everything is done, cd to the services directory and copy the example conf:

```
cd /path/to/Unreal3.2.10.1/services
cp example.conf services.conf
```

```
Open services.conf in your favorite editor and modify/add these values:
IRCDModule "unreal32"
RemoteServer 127.0.0.1 6667 "services"
ServerName "services.yourdomain.com"
ServicesRoot "YourNicknameHere"
```

**\*\* Configuration \*\***  
Copy the example configuration file  
cd Unreal3.2.10.1/  
cp doc/example.conf unrealircd.conf

Lines that start with # are my comments so you don't have to add them to the config file.

```
/* FOR *NIX, uncomment the following 2lines: */
loadmodule "src/modules/commands.so";
loadmodule "src/modules/cloak.so";
```

Set your IRCD info:

```
me
{
name "irc.yourdomain.com";
info "your IRC network name";
numeric 1;
};
```

Show users you're the admin

```
admin {
"Your Name";
"Your Nickname";
"your@email.addr";
};
```

Add an O:Line for yourself  
You can edit the one already there  
O:Lines define the IRCops

```
oper YourNickHere {
class clients;
from {
userhost *@*;
};
password "YourPassHere";
flags
{
netadmin;
can_zline;
can_gzline;
can_gkline;
g lobal;
};
};
```

Add a C/N Line for IRC Services  
Don't edit the link block already there.  
C/N Lines allow other IRCDs or IRC Services to link with you

```
link services.itunix.eu
{
   username   *;
   hostname    192.168.0.100;
   bind-ip    *;
   port       7070;
   hub             *;
   password-connect "password";
   password-receive "password";
   class           servers;
   options {
      };
};
```

```
listen         *:6697
{
	options
	{
		ssl;
		clientsonly;
	};
};

listen *:7070
{
	options
	{
		serversonly;
	};
};

```

```
link            hub.itunix.eu
{
	username	*;
	hostname 	127.0.0.1;
	bind-ip 	*;
	port 		7029;
	hub             *;
	password-connect "password";
	password-receive "password";
	class           servers;
		options {
			/* Note: You should not use autoconnect when linking services */
			autoconnect;
			ssl;
			zip;
		};
};

```

You can edit the ulines block already there

```
ulines {
	services.itunix.eu;
	stats.itunix.eu;
};

```

Network configuration is the most important part  
You can use the block already there

```
/* Network configuration */
set {
network-name "YourNetworkNameHere";
default-server "irc.yourdomain.com";
services-server "services.yourdomain.com";
stats-server "stats.yourdomain.com";
help-channel "#help";
hiddenhost-prefix "hidden";
/* prefix-quit "no"; */
/* Cloak keys should be the same at all servers on the network.
/* [..etc..]
*/
cloak-keys {
"J7hVz4Zb7x4YwpWaoAr1HnR6gl3s";
"OH877h87UGU90jioIOjhiUI898hgF";
"UHUHij89IOjiojiio8990KJBBKU898";
};
/* on-oper host */
hosts {
local "locop.yourdomain.com";
global "ircop.yourdomain.com";
coadmin "coadmin.yourdomain.com";
admin "admin.yourdomain.com";
servicesadmin "csops.yourdomain.com";
netadmin "netadmin.yourdomain.com";
host-on-oper-up "no";
};
};
```

Server configuration  
You can edit the block already there

```
/* Server specific configuration */
set {
kline-address "VALID.mail@address.here";
auto-join "#lobby";
modes-on-connect "+ixw";
modes-on-oper "+xwgs";
oper-auto-join "#opers";
dns {
nameserver Your.DNS.IP.Here;
timeout 2s;
retries 2;
};
```

\***\* Anope**  
Corrected that but in services.conf where i had:

```
RemoteServer 192.168.0.100 7070
```

MysqlHost &#8220;127.0.0.1&#8221;  
MysqlUser &#8220;user&#8221;  
MysqlPass &#8220;pass&#8221;  
MysqlName &#8220;anope&#8221;  
MysqlSock &#8220;/tmp/mysql.sock&#8221;  
MysqlPort 3306

and import tables.sql to mysql

Save and close the config file  
Start Anope IRC Services with debug mode enabled in order to spot:

```
./services -debug -nofork
```

If the services didn't show any errors in the console and connected (and stayed connected) to the IRC server, it's safe to run them normally:

```
./services
```

Start your new IRCD server by typing:

```
./unreal start
```
