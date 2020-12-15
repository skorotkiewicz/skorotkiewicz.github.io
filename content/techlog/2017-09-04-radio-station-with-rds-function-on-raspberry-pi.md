---
layout: post
title: "Radio station with RDS function on Raspberry Pi"
date: 2017-09-04 01:18:06 +0200
year: "2017"
month: "2017/09"
categories:
  - Posts
tags:
  - linux
  - radio
  - rds
  - raspberry
---

Today I will demonstrate you how to install the FM radio transmitter on Raspberry Pi. It is not just a transmitter! It supports RDS function with all its options (PS, RT, TA/TP). So do it!

The only thing we need to know is that the transmitter needs an antenna. Of course, you can broadcast from GPIO goldpin, but the range of such a solution is barely a few meters. Simply attach the short cables to the GPIO4 (4 pin inside) to extend the range up to a hundred meters.<br />
On legality: this is not legal, but for such a do-it-yourself exercise, no one will prosecute us.

Installation of the required packages

```

apt-get update && apt-get upgrade
apt-get install libsndfile1-dev
git clone https://github.com/ChristopheJacquet/PiFmRds.git
cd PiFmRds/src
make

```

Then enter:<br />
`./pi_fm_rds`<br />
<kbd>This will start by transmitting a default message at 100.0MHz with default subtitles in RDS.</kbd>
<br />

We can of course replace the transmitted sound. To do this we type:<br />
`./pi_fm_rds -audio sound.wav`<br />
<kbd>This option only accepts WAV 16-bit (stereo or mono) files. MP3 files will cause an error.</kbd>
<br />

A change of frequency would also be useful: change of frequency<br />
`./pi_fm_rds -audio sound.wav -freq 88.0`<br />

And also RDS subtitling:<br />
`./pi_fm_rds -audio sound.wav -ps 'PI-FM' -rt 'Breaking News: Obama became president Now Playing: Big Sean'`<br />
<kbd>`ps` is the name of the station - max. 8 characters, while `rt` is the message - max. 64 characters.</kbd>
<br />

Theoretically everything is ready, but it would also be useful to be able to change RDS parameters during playback. To do this, you must first allow the transmitter to operate in the background. To do this, add the & symbol at the end of the command. The whole thing looks like this:<br />
`./pi_fm_rds -audio sound.wav -ps 'PI-FM' -rt 'Breaking News: Obama became president Now Playing: Big Sean'&`<br />

From now on, the broadcast is running in the background. To allow you to change parameters during the process, you need to create a special file and add tracking options to the encoder.<br />

```

mkfifo rds_ctl
./pi_fm_rds -audio sound.wav -ps 'PI-FM' -rt 'Breaking News: Obama became president Now Playing: Big Sean' -ctl rds_ctl&

```

Now we are writing:<br />

```

cat >rds_ctl
PS max8characters
RT message-max64characters
TA ON
TA OFF

```

Everything is surely clear.... except for TA. This function can switch the car sound system while listening from a disc to our station to listen to important traffic news.

I'll give you one more nice command, allowing you to transmit the sound from the microphone:<br />
`arecord -fS16_LE -r 44100 -Dplughw:1,0 -c 2 - | ./pi_fm_rds -audio -`<br />
<kbd>You can of course add other parameters before -audio.</kbd>
<br />

Finally, I would like to make one final point - stopping the background radio station. To do this, please enter:<br />
`fg`<br />
Then press Ctrl+C.

## Happy fun!

### I do not take responsibility for illegal use of the program (stunning stations or trolling someone with TA function).
