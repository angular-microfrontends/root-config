# Angular root-config

[![CircleCI](https://circleci.com/gh/angular-microfrontends/root-config.svg?style=svg)](https://app.circleci.com/pipelines/github/angular-microfrontends/root-config)

## What is this?

This is an example microfrontend repo demonstrating how to use [single-spa](https://single-spa.js.org). You can see the code running at https://angular.microfrontends.app.

## How does it work?

[Full article](https://single-spa.js.org/docs/recommended-setup)

This repository is a javascript project that creates a javascript bundle that is an in-browser javascript module (explanation on [youtube](https://www.youtube.com/watch?v=Jxqiu6pdMSU&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=2) / [bilibili](https://www.bilibili.com/video/av83498486/)). The currently deployed version of the in-browser module can be seen at https://angular.microfrontends.app/importmap.json.

This project uses [Angular](https://angular.io) and was created with the [create-single-spa](https://single-spa.js.org/docs/create-single-spa) CLI. It uses webpack and babel.

Whenever a pull request is merged to master, [CircleCI builds and deploys the project](https://circleci.com/gh/angular-microfrontends/root-config). The ["workflows" view](https://circleci.com/gh/angular-microfrontends/workflows) (pictured below) can be seen if you are logged into CircleCI. Deployments for this in-browser module are completely independent of deployments for any other module.

![image](https://user-images.githubusercontent.com/5524384/75210801-5ba02700-573f-11ea-8064-46af165cba0a.png)

## Local development

[Full documentation](https://single-spa.js.org/docs/recommended-setup#local-development)

Tutorial video: [youtube](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4) / [bilibili](https://www.bilibili.com/video/av83617789/)

There are two ways to do local development. It is preferred to do one module at a time, whenever possible.

### One module at a time

```sh
cd root-config
pnpm install
pnpm start -- --https
```

Go to https://localhost:9000/angular-microfrontends-root-config.js and verify that you are able to load the file without any SSL problems. To solve SSL problems, see [these instructions](https://improveandrepeat.com/2016/09/allowing-self-signed-certificates-on-localhost-with-chrome-and-firefox/).

Now, go to https://angular.microfrontends.app. In the browser console, run the following:

```js
localStorage.setItem("devtools", true);
```

Refresh the page. Click on the tan / beige rectangle:

![image](https://user-images.githubusercontent.com/5524384/75211359-e46b9280-5740-11ea-80bb-974846df414b.png)

Set an [import map override](https://github.com/joeldenning/import-map-overrides/) to `9000`.

![image](https://user-images.githubusercontent.com/5524384/75211553-7e333f80-5741-11ea-97d6-d3d86ffd1826.png)

Refresh the page. Your local code for this module will now be running on https://angular.microfrontends.app. You may make changes locally and refresh the page to see them.

### All modules together

Run the root-config project locally:

```sh
cd root-config
pnpm install
pnpm start
```

Now follow the steps above for "One module at a time" for each of the modules you wish to work on.

Explaining modules, in order they should be started:

1. **root-config**: single-spa root, bootstrap and loads each SPA.

   ```sh
   pnpm install
   pnpm start
   ```

2. **shared-dependencies**: Import map configuration outside of root project.

   ```sh
   pnpm install
   pnpm start
   ```

3. **navbar**: Angular 10 example navbar always on screen to display coexisting versions. Don't
   forget to override it's location.

   ```sh
   pnpm install
   pnpm serve:single-spa:navbar
   ```

4. **shared-angular**: Library projects. Component sharing.

   ```sh
   pnpm install
   pnpm build core
   pnpm build single-spa-angular
   pnpm start
   ```

5. **play**: Angular 11 using shared components.

   ```sh
   pnpm install
   pnpm serve:single-spa:play
   ```

6. **stats**: Angular 11 using shared components.

   ```sh
   pnpm install
   pnpm serve:single-spa:stats
   ```

7. Overrides
   1. Override "@angular-microfrontends/core" with "http://localhost:9002/angular-microfrontends-core/bundles/angular-microfrontends-core.umd.js".
   2. Override "@angular-microfrontends/navbar" with "http://localhost:4201/main.js".
   3. Override "@angular-microfrontends/play" with "http://localhost:4202/main.js".
   4. Override "@angular-microfrontends/stats" with "http://localhost:4203/main.js".
   5. Override "single-spa-angular" with "http://localhost:9002/single-spa-angular/single-spa-angular.js".

## Adapting for your organization

Feel free to fork and modify any files you would like when doing a proof of concept for your organization. When it's time to actually create / adapt your organization's projects, consider using [create-single-spa](https://single-spa.js.org/docs/create-single-spa) instead of forking this repository.
