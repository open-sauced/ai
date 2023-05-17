<div align="center">
  <br>
  <img alt="Open Sauced" src="https://i.ibb.co/7jPXt0Z/logo1-92f1a87f.png" width="300px">
  <h1>🍕 Open Sauced Browser Extension(s) 🍕</h1>
</div>
<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/open-sauced/browser-extensions" alt="GitHub code size in bytes">
  <img src="https://img.shields.io/github/commit-activity/w/open-sauced/browser-extensions" alt="GitHub commit activity">
  <a href="https://github.com/open-sauced/browser-extensions/issues">
    <img src="https://img.shields.io/github/issues/open-sauced/browser-extensions" alt="GitHub issues">
  </a>
  <a href="https://discord.gg/U2peSNf23P">
    <img src="https://img.shields.io/discord/714698561081704529.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
  </a>
  <a href="https://twitter.com/saucedopen">
    <img src="https://img.shields.io/twitter/follow/saucedopen?label=Follow&style=social" alt="Twitter">
  </a>
</p>

## Documentation

The documentation for the project can be found [here](https://docs.opensauced.pizza/chrome-extension/introduction-to-the-chrome-extension/).

## Running the project locally

To run the project, you'll need the following software binaries installed on your development machines:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)

To install the project dependencies:

```shell
npm ci
```

To run a local instance of the project:

```shell
npm run dev
```

## Installing the local build on a Chromium based browser:
After running the above commands,
1. Navigate to `chrome://extensions`. 
2. Enable the `Developer Mode`.
3. Select `Load unpacked` and choose the generated `dist` directory from the project folder to install it.

You should now have the extension installed and running.

## 🙌🏼 Core Team
<p align="left>
  <a href="https://github.com"/></a>
  <a href="https://github.com/bdougie">
    <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/5713670&h=60&w=60&fit=cover&mask=circle" alt="Brian Douglas">
  </a>
  <a href="https://github.com/diivi">
    <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/41837037&h=60&w=60&fit=cover&mask=circle" alt="Divyansh Singh">
  </a>
  <a href="https://github.com/Anush008">
    <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/46051506&h=60&w=60&fit=cover&mask=circle" alt="Anush Shetty">
  </a>
</p>

## 🤝 Contributing

We encourage you to contribute to OpenSauced! Please check out the [Contributing guide](https://docs.opensauced.pizza/contributing/introduction-to-contributing/) for guidelines about how to proceed.

We have a commit utility called [@open-sauced/conventional-commit](https://github.com/open-sauced/conventional-commit) that helps you write your commits in a way that is easy to understand and process by others.

## 🚀 Releases

We use our own [configuration for semantic-release](https://github.com/open-sauced/release). This allows us to automatically generate changelogs and releases for our projects based on the commit messages.

The `beta` branch is the default branch. We squash & merge PRs to the `beta` branch. We never commit directly to `main`.

A merge to `beta` will trigger a beta release. A merge to `main` will trigger a full release.

Make sure to checkout the beta branch for the latest changes, and follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification when writing commit messages.

## 🍕 Community

Got Questions? Join the conversation in our [Discord](https://discord.gg/U2peSNf23P).  
Find Open Sauced videos and release overviews on our [YouTube Channel](https://www.youtube.com/channel/UCklWxKrTti61ZCROE1e5-MQ).

## ⚖️ LICENSE

MIT © [Open Sauced](LICENSE)
