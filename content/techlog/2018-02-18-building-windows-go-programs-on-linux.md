---
layout: post
title: "Building windows go programs on linux"
date: 2018-02-18 13:54:53 +0200
year: "2018"
month: "2018/02"
categories:
  - Posts
tags:
  - linux
  - windows
  - golang
---

`$ cat hello.go`

```go
package main
import "fmt"

func main() {
        fmt.Printf("Hello\n")
}
```

`$ GOOS=windows GOARCH=386 go build -o hello.exe hello.go`
