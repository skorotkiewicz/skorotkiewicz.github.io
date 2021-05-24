---
title: "Getting started with IRC and Weechat"
date: 2021-05-24T12:54:26+02:00
year: "2021"
month: "2021/05"
# categories:
#   - Posts
tags:
  - linux
  - macos
  - windows
  - irc
  - weechat
  - libera
slug: getting-started-with-irc-and-weechat
draft: false
---

Hi, first of all I would like to tell you what IRC is, I will explain it in simple words so that even non-technical people can start playing with IRC.
In very simple terms, IRC is a server with rooms where each user can create their own room and chat with others.
Each room can have its own rules, where you can set for example if unregistered users can access the room, if everyone can change the room title etc...

Today I will describe how to start chat with IRC with my favorite IRC Weechat client, it's a terminal client, but don't worry, it's very easy to configure and use on a daily basis, and if you have your own server you can even set it up in `screen -S weechat` :)

Shall we get started? Here we go!

## Install Weechat

First we need to install our new IRC client, there are many ways to install it, depending on which system you use.
On Archlinux you just need `pacman -S weechat` and on macOS `brew install weechat`.
Today I will focus on compiling Weechat, so everyone can run it on any system.

No worries as you saw the word _compile_, weechat is very easy to compile :)

You can skip the compilation step and download the finished weechat from [weechat.org](https://weechat.org/). But what fun is that?

For those who didn't skip the compilation step, here's a small and quick tutorial.

```
$ mkdir build
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX=/path/to/directory
$ make
$ make install
```

If you are root, you can remove "`-DCMAKE_INSTALL_PREFIX=/path/to/directory`"

## Configuration

That's it! We now have Weechat, you can run it with a command, guess what? Of course "pigchat", just kidding, we use the `weechat` command to launch our new IRC client.

There's nothing interesting at the beginning, so it's a good idea to add an IRC server so you can connect and enter the room.

To do this, type `/server add <any name> <server address>` into weechat

```
/server add libera irc.libera.chat
```

Remember to save your settings after each command, otherwise you will have to set weechat again each time, which is not convenient.  
So run it:

```
/save
```

## Connecting

We have our server, it would be nice to connect to it, to do this you can type `/connect libera`, simple, but do you want to type the command every time to connect? No!
That's why it makes sense to do an autoconnect!
Weechat wants to help us to use IRC quickly and comfortably, so we set it to:

```
/set irc.server.libera.autoconnect on
```

And don't forget to `/save`!

From now on, it will automatically connect to the IRC server. You can enter rooms anonymously and talk.
To enter a room, type `/join #<room name>`

```
/join #libera
```

Remember to always connect via SSL if your server allows it, our libera.chat server supports SSL, so set it up:

```
/set irc.server.libera.addresses "irc.libera.chat/6697"
/set irc.server.libera.ssl on
/save
```

## Nickname

But you will probably want to have your own permanent nickname on an IRC server, and NickServ can help you with that (not every server has it, but most do)

Let's start with a simple configuration of your data:
Set up your username and your real name in Weechat. (optional step)

```
/set irc.server.libera.username "My user name"
/set irc.server.libera.realname "My real name"
/save
```

To register your nickname with NickServ enter:

```
/nick <your nickname>
/msg NickServ REGISTER YourPassword youremail@example.com
```

Be sure to enter your real e-mail address, as a confirmation code will be sent to your mailbox.
Check your mailbox, you should receive an e-mail with such a message:

```
/msg NickServ VERIFY REGISTER <your nickname> 4vH6x28BXrgT7E
```

Type this message into weechat and you are now properly registered and verified!

Login to your account:

```
/msg nickserv identify xxxxxxx
```

To avoid having to manually log into your account all the time, add your login details to the configuration!

```
/set irc.server.libera.sasl_mechanism plain
/set irc.server.libera.sasl_username "mynick"
/set irc.server.libera.sasl_password "xxxxxxx"
/save
```

Exit weechat `/quit` and run `weechat` again to see if you automatically connect to the server and are automatically logged in, if you did everything right, you are properly logged in.

You are now ready to begin.

## Chat

But Now I'll give you a quick explanation on how to use the weechat interface first enter multiple channels:

```
/join #libera
/join #linux
/join #hswaw
```

You can navigate between them by pressing <kbd>ALT</kbd>+<kbd>up arrow</kbd>/<kbd>down arrow</kbd>

If you want it to automatically enter your favorite rooms when you start weechat, type it:

```
/set irc.server.freenode.autojoin "#libera,#hswaw"
/save
```

To leave the room channel:

```
/close
```

To write a private message to someone:

```
/query <user> message
```

And go to the buffer with <kbd>ALT</kbd>+arrows

## Bonus

Quite useful information:
You have probably noticed that all the time the IRC server is "spamming" you with messages that someone has joined or left, for this you can set a "smart filter" where it will only show you information about someone leaving if they have recently texted something.
Very useful!

```
/set irc.look.smart_filter on
/filter add irc_smart * irc_smart_filter *
/save
```

## Conclusion

- You know how to...
  - ...install, compile weechat.
  - ...connect to the server.
  - ...enter the room.
  - ...register and log in.
  - ...automate the connection and login process.
  - ...send messages.
  - ...navigate through the.

You are ready!

For more detailed information about Weechat please visit official Weechat documentation, I highly recommend Weechat intergration with ZNC or custom interface!

## ChanServ

If you want to register your own channel and set up ChanServ Guard, I recommend my [older blog post](https://skorotkiewicz.github.io/techlog/tiny-irc-doc/).
