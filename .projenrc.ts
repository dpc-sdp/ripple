import { javascript } from "projen";
import { SdpMonorepo } from "@dpc-sdp/ripple-sdp-projen-config";

const project = new SdpMonorepo({
  debug: false,
  defaultReleaseBranch: "main",
  devDeps: [
    "@dpc-sdp/ripple-sdp-projen-config@alpha",
    "@awmottaz/prettier-plugin-void-html@^1.5.0",
    "@bahmutov/cypress-esbuild-preprocessor@^2.2.0",
    "@commitlint/cli@^20.5.0",
    "@commitlint/config-conventional@^20.5.0",
    "@cypress/vite-dev-server@^5.0.5",
    "@dpc-sdp/eslint-config-ripple@workspace:*",
    "@dpc-sdp/stylelint-config-ripple@workspace:*",
    "changelogen@^0.6.2",
    "cypress@^15.7.1",
    "eslint@^8.36.0",
    "husky@^8.0.3",
    "postcss-nested@^6.0.1",
    "postcss-normalize@^10.0.1",
    "postcss-preset-env@^8.1.0",
    "start-server-and-test@^3.0.2",
    "stylelint@^15.10.2",
    "vitest@^4.0.18",
  ],
  name: "ripple",
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.addScripts({
  example: 'wrap () { pnpm -F example-"$*" dev | cat; }; wrap',
  clean: "git clean -dfx && git reset --hard && pnpm",
  build: 'pnpm -F !docs -F !ripple-storybook -F !nuxt -F !vue-app -F !webcomponents build',
  "build:ripple": 'pnpm -F "@dpc-sdp/ripple-ui-*" build',
  "build:docs": "pnpm -F docs build",
  "build:storybook": "pnpm -F ripple-storybook static:build",
  postinstall: "husky install && pnpm build",
  preinstall: "npx only-allow pnpm",
  release:
    "pnpm build:ripple && pnpm -r --filter './packages/**' --filter '@dpc-sdp/ripple-ui-*' publish --no-git-checks",
  lint: "eslint . --ext .ts,.vue && stylelint 'packages/ripple-ui-core/**/*.css'",
  "test:unit": "vitest run",
  "test:unit-watch": "vitest watch",
  "test:storybook-ci": "pnpm -F ripple-storybook test:ci",
  cypress: "cypress open --global",
  chromatic:
    "npx chromatic --storybook-build-dir ./packages/ripple-storybook/storybook-static --storybook-base-dir ./packages/ripple-ui-core --storybook-config-dir ./packages/ripple-ui-core",
});

project.synth();
