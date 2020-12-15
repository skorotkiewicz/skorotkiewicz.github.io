---
layout: post
title: "My GPG setup for developing and more"
date: 2020-07-19 00:14:17 +0200
year: "2020"
month: "2020/07"
categories:
  - Posts
tags:
  - linux
  - gpg
hidden: false
---

## Generating a new GPG key

If you don't have your own GPG key yet, it's time to generate one for yourself, you can find a great guide on the [GitHub website](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-gpg-key).

_Enter a valid email address!_

```
$ gpg --full-generate-key
```

# Telling Git about your GPG key

Git supports signing your commits with GPG, we already have our generated key, so we can add it to our Git client so that every new commit is signed with our key.

We must first check our GPG key ID, in our case, our key has an ID `EC9494C3BEC89171`

```
$ gpg --list-secret-keys --keyid-format LONG
sec   rsa4096/EC9494C3BEC89171 2020-07-18 [SC]
uid                 [ultimate] Gnu Exampler (My GPG Key) <example@example.com>
ssb   rsa4096/98E78B644E6D2336 2020-07-18 [E]
```

Now we can add our GPG key ID to Git.

```
$ git config --global user.signingkey EC9494C3BEC89171
```

From that moment on, each of our new commits will be signed with our GPG key.

# Adding a new GPG key to your GitHub/GitLab/Gitea account

GitHub, GitLab or Gitea support displaying signed commits, just add your **PUBLIC** GPG key to GitHub, GitLab or Gitea.  
To display your public key:

```
$ gpg --export -a "EC9494C3BEC89171"

-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBFR7CqsBEAC8PymJ5IrL3ZFgPtFXdrzwVa1fsKQ51/vaxQbPdamIyIzxRGH8
...
-----END PGP PUBLIC KEY BLOCK-----
```

To add a public GPG key to the GitHub/GitLab/Gitea you need to enter your account settings and click on the `SSH and GPG keys` tab.

_Your Git is ready to use GPG!_

# More...

But it's not over, you can do even more with GPG e.g. encrypt Mail or XMPP messages! Or sign your own posts, for example on a blog posts.

- I use the Mail Thunderbird client with the free [Enigmail](https://enigmail.net/) plugin to encrypt/decrypt emails.
- For chat I use PSI to encrypt messages on XMPP, but almost every XMPP clients already has GPG support, (such as [Dino](https://dino.im/) and [Gajim](https://gajim.org/)).

Here you can see more interesting programs that support GPG encryption, [Software](https://www.openpgp.org/software/).

## Confirmation of identity

We live in an era where we have many accounts, where everyone can steal our identity, but with GPG, this problem can also be solved.
For example, [Keyoxide](https://keyoxide.org/) can come to your support, where you can easily create your _trusted profile_ and confirm that the accounts belongs to you.

Nobody without your private key is able to add anything to your public key.

First, we need to get to know our GPG fingerprint:

```
$ gpg -k "EC9494C3BEC89171"
pub   rsa4096 2020-07-18 [SC]
      367EE902C81248482C3214DFEC9494C3BEC89171
sec                 [ultimate] 2020-07-18 [SC]
uid                 [ultimate] Gnu Exampler (My GPG Key) <example@example.com>
ssb                 [ultimate] 2020-07-18 [E]
```

In our case, it's `367EE902C81248482C3214DFEC9494C3BEC89171`.

But step by step, e.g. we have our Twitter account, we want to confirm that only this account belongs to us.

To do this, go to [Keyoxide Twitter](https://keyoxide.org/guides/twitter) page and open a guide on how to confirm your Twitter account and step by step do what is written in the guide! :)

1. Post a Twitter proof message

2. Log in to [twitter.com](https://twitter.com/) and compose a new tweet with the following text (make sure to replace FINGERPRINT):

```
This is an OpenPGP proof that connects my OpenPGP key to this Twitter account. For details check out https://keyoxide.org/guides/openpgp-proofs

[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]
```

3. After posting, copy the link to the tweet.

4. First, edit the key (make sure to replace FINGERPRINT):

```
$ gpg --edit-key FINGERPRINT
```

5. Add a new notation:

```
notation
```

6. Enter the notation (make sure to update with the link to the tweet copied above):

```
proof@metacode.biz=https://twitter.com/USERNAME/status/1234567891234567891
```

7. Save the key:

```
save
```

8. Upload the key to the server (make sure to replace FINGERPRINT):

```
$ gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT
```

# Done!

And you're done! Go to your profile page, **https://keyoxide.org/FINGERPRINT** it should now show a verified Twitter account.

Remember to use Keyoxide you must first send your GPG public key to the key server (keys.openpgp.org) and verify the email!

Here is my trusted profile on [Keyoxide.org](https://keyoxide.org/B498E2E410902F8AEC108F4F5BDC557B496BDB0D)

# Delete one of your proofs

First, edit the key (make sure to replace FINGERPRINT):

```
gpg --edit-key FINGERPRINT
```

List detailed preferences:

```
showpref
```

You should now see your key details, uid, and proofs assigned to your keys. Copy and exit gpg.

Enter again:

```
gpg --edit-key FINGERPRINT
```

Launch the notation prompt:

```
notation
```

Enter the - (minus) symbol followed by the proof you want to delete. Make sure you type the proof exactly like it is in your key.

```
-proof@metacode.biz=dns:yourdomain.org?type=TXT
```

To make it easier to enter the right proof, you could first list all proofs and simply copy the proof (including `proof@metacode.biz=`) you want to delete.

Save the changes:

```
save
```

Upload the key to WKD or use the following command to upload the key to keys.openpgp.org (make sure to replace FINGERPRINT):

```
gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT
```
