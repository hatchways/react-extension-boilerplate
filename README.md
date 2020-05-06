# React Boilerplate Extension

This repo uses a modified custom frame from https://github.com/satendra02/react-chrome-extension, as well as its build script and installation instructions below

## Installation

```
yarn install
```

Now build the extension using

```
yarn build
```

You will see a `build` folder generated inside `[PROJECT_HOME]`

You can also run it using `yarn start` to debug faster with hot reload

## Adding React app extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

<img src="https://cdn-images-1.medium.com/max/1600/1*OaygCwLSwLakyTqCADbmDw.png" />

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install the React app as a Chrome extension.

When you go to any website and click on extension icon, injected page will toggle.

<img src="https://cdn-images-1.medium.com/max/1600/1*bXJYfvrcHDWKwUZCrPI-8w.png" />

## Devlopment

Your entrypoint should be the Main function inside Main.JS. The remaining code is for setting up the iframe, solving css conflict issues, among other things.
other extension related code, inclusing the manifest, should be added to the /public folder
