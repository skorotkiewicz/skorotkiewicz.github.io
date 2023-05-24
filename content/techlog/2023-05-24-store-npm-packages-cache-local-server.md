---
title: "How to Store NPM Packages Cache on a Local Server"
date: 2023-05-24T15:21:01+02:00
year: "2023"
month: "2023/05"
# categories:
#   - Posts
tags:
  - npm
  - cache
  - local
  - server
  - store
  - verdaccio
slug: store-npm-packages-cache-local-server
draft: false
---

If you want to move the Node.js/React package cache to a local server, there are several approaches you can consider. One of them is using a private npm registry like Verdaccio and setting it up on your server.

1. Install and configure Verdaccio on your local server. You can find more information on the Verdaccio project's website (https://verdaccio.org/).
2. Run the Verdaccio server on your local server. It will act as a private repository for your packages.
3. Configure your Node.js/React projects to use the Verdaccio private registry as the main package source. You can do this by editing the `.npmrc` file in your project directory or by adding the appropriate entries to the `package.json` file (under the `"config"` section).

Example `.npmrc` configuration:

```
registry=http://<your-verdaccio-server-address>:<verdaccio-port>/
```

Example `package.json` configuration:

```json
{
  "config": {
    "registry": "http://<your-verdaccio-server-address>:<verdaccio-port>/"
  }
}
```

4. Install and configure the cache management tool for `yarn`. You can use the `yarn-offline-mirror` tool, which allows you to store package cache on the local server.

You can install it globally by running the command:

```sh
yarn global add yarn-offline-mirror
```

5. Configure `yarn` to use the cache on your local server. Run the following command in the project's root directory:

```
yarn config set yarn-offline-mirror <path-to-local-directory-on-server>
```

Where `<path-to-local-directory-on-server>` is the path to the directory on the server where you want to store the package cache.

6. Now, when you install new packages in your project using `yarn add`, `yarn` will first check your local Verdaccio repository, and if the package is not available, it will download it to the local cache directory on the server and then to your project.

These are the general guidelines that should help you move the package cache to a local server. However, please note that the details and configuration may vary depending on the tools and environment you are using.
