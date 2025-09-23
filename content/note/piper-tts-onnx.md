---
title: "piper-tts-onnx on archlinux"
date: 2025-09-23T07:31:21+00:00
year: "2025"
month: "2025/09"
# categories:
#   - Posts
tags:
  - piper
  - tts
  - onnx
  - archlinux
slug: piper-tts-onnx
draft: false
---

download piper-voices:
```
https://huggingface.co/rhasspy/piper-voices/
```

```
ls ~/.config/speech-dispatcher/voices/
de_DE-thorsten-high.onnx       de_DE-thorsten-medium.onnx.json  en_US-lessac-low.onnx       en_US-ryan-medium.onnx.json     pl_PL-gosia-medium.onnx
de_DE-thorsten-high.onnx.json  en_US-amy-medium.onnx            en_US-lessac-low.onnx.json  pl_PL-darkman-medium.onnx       pl_PL-gosia-medium.onnx.json
de_DE-thorsten-medium.onnx     en_US-amy-medium.onnx.json       en_US-ryan-medium.onnx      pl_PL-darkman-medium.onnx.json
```

```sh
# cat ~/.config/speech-dispatcher/speechd.conf

 AddModule "piper-tts-generic"        "sd_generic"   "piper-tts-generic.conf"
 DefaultModule   piper-tts-generic
```

```sh
# cat ~/.config/speech-dispatcher/modules/piper-tts-generic.conf

GenericExecuteSynth "echo \"$DATA\" | piper-tts --model /home/mod/.config/speech-dispatcher/voices/$VOICE --output_raw -f - | mpv --no-terminal --keep-open=no -"

GenericLanguage "pl" "pl" "UTF-8"
GenericLanguage "de" "de" "UTF-8"
GenericLanguage "en" "en" "UTF-8"

AddVoice "pl" "female1" "pl_PL-gosia-medium.onnx"
AddVoice "pl" "male1"   "pl_PL-darkman-medium.onnx"

AddVoice "en" "female1" "en_US-lessac-low.onnx"
AddVoice "en" "male1"   "en_US-ryan-medium.onnx"

AddVoice "de" "male1"   "de_DE-thorsten-high.onnx"

#DefaultVoice "pl_PL-gosia-medium.onnx"

GenericCharset "UTF-8"
```
