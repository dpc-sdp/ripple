# Contributing

> When contributing or participating in discussions, ensure that you are following our [contributor code of conduct](https://github.com/dpc-sdp/ripple-framework/blob/develop/CODE_OF_CONDUCT.md)
> 

This repository is a mono repo that utilises `pnpm` workspaces, meaning multiple `npm` packages are contained within the `packages` directory.

## Pre-requisites

- [Node.js](https://nodejs.org/en/) (lts/iron i.e v20)
- [PNPM](https://pnpm.io/) (v10)

It is recommended to also use [NVM](https://github.com/nvm-sh/nvm) to manage node versions. NVM will use the correct version set in `.nvmrc` by running `nvm use`

## Getting started

Clone the repository `git clone git@github.com:dpc-sdp/ripple.git` then run `pnpm install` to install all dependencies.

### Development

There are three main ways to develop within Ripple Framework; working on isolated Ripple components within storybook, working Tide integration packages or layers utilizing the example nuxt app, and working on standalone `npm` packages.

#### Working on the Ripple component library 

Development for the core ui components (`@dpc-sdp/ripple-ui-core`), form ui components (`@dpc-sdp/ripple-ui-forms`) and maps ui components (`@dpc-sdp/ripple-ui-maps`) is done within storybook. To get started just run:

```bash
pnpm run storybook
```

This will open a browser window with the storybook instance running. All UI components within these packages have an accompanying storybook story.  For a good example component that contains stories and cypress component tests please see [RplAccordion](https://github.com/dpc-sdp/ripple/tree/main/packages/ripple-ui-core/src/components/accordion).

#### Working on Tide integration packages

For more on contributing to Tide packages, please see [Ripple Framework](https://github.com/dpc-sdp/ripple-framework/blob/develop/CONTRIBUTING.md).

## Coding standards

### Code style

Ripple uses [Prettier](https://prettier.io/) to allow developers to spend less time worrying about conforming to a specific code style. It's recommended that you set up Prettier in your IDE to format your work on save.

[ESLint](https://eslint.org/) is also used to improve code quality, linting can be run with `pnpm run lint`.

### Conventional Commits

Ripple uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to encourage meaningful commit messages. This is also for building the Ripple changelogs automatically. 

[Commitlint](https://commitlint.js.org/#/) is used to enforce the Conventional Commit format.

An example of a well-formed commit message is:

```
fix(@dpc-sdp/ripple-ui-core): fixed table font size for paragraphs and lists
```

### CSS structure

Ripple uses the [BEM (block, element, modifier)](https://getbem.com/) methodology to help structure CSS and avoid naming conflicts.

All ripple classes provided by ripple are prefixed by `rpl-` to prevent conflicts with CSS in other projects or libraries. For example:

- Component class name: `.rpl-[component-name]`
- Element class name: `.rpl-[component-name]__[element-name]`
- Modifier class name: `.rpl-[component-name]--[modifier-name]`

## Testing

### Linting

Linting is handled by `eslint` and `stylelint`; note stylelint is currently scoped to `@dpc-sdp/ripple-ui-core`

```bash
pnpm run lint
```

### Unit tests

Unit tests are important as they help us secure our processes, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in development.

All unit tests are handled by [Vitest](https://vitest.dev/), and can be run with:

```bash
pnpm run test:unit
```

### Component tests

Component tests are run using [Cypress's component testing feature](https://docs.cypress.io/guides/component-testing/overview) and are used for Vue component testing.

The core component tests `@dpc-sdp/ripple-ui-core` can be run using:

```bash
pnpm run test:components-core
```

We also have component testing for the `@dpc-sdp/ripple-ui-forms` and `@dpc-sdp/ripple-ui-maps` packages:

```bash
pnpm run test:components-forms
pnpm run test:components-maps
```

## Ripple directory structure

The core Ripple directory structure is as follows:

- docs (the documentation site)
- examples (example applications)
- packages (this is where all npm packages are stored)
  - ripple-ui-core
  - ripple-ui-forms
  - ripple-ui-maps
  - etc

## Releases

Ripple uses [release-please](https://github.com/googleapis/release-please) to automate releases based on [Conventional Commits](#conventional-commits). The release process is handled entirely through GitHub Actions.

### Release Types

#### Standard Releases (main branch)

When changes are merged to the `main` branch, release-please automatically:

1. **Creates or updates a release PR** containing:
   - Version bumps for all affected packages based on conventional commits
   - Updated CHANGELOG.md files
   - Updated package.json versions

2. **When you merge the release PR**, the workflow automatically:
   - Publishes all packages to GitHub Package Registry with the `latest` tag
   - Creates GitHub Releases with auto-generated release notes

**Version bumping rules:**
- `feat:` commits → minor version bump (e.g., 2.46.0 → 2.47.0)
- `fix:`, `perf:` commits → patch version bump (e.g., 2.46.0 → 2.46.1)
- `BREAKING CHANGE:` or `!` in commit → major version bump (e.g., 2.46.0 → 3.0.0)

#### Alpha Releases (release branches)

Alpha releases are automatically published when changes are pushed to `release/*` branches. These are pre-release versions for testing:

1. Each push to a `release/*` branch automatically:
   - Builds all packages
   - Bumps versions to `{current-version}-alpha.{git-hash}` (e.g., `2.46.0-alpha.abc1234`)
   - Publishes to GitHub Package Registry with the `alpha` tag

2. Alpha releases:
   - Do not create GitHub Releases
   - Do not update CHANGELOGs
   - Are tagged as `alpha` in npm (install with `npm install @dpc-sdp/package@alpha`)

### Backporting Changes

Ripple uses automated backporting to help maintain release branches. To backport a merged PR:

1. Add a label to the merged PR in the format: `backport release/X.Y`
   - Example: `backport release/2.46` will backport to the `release/2.46` branch

2. The backport workflow will automatically:
   - Create a new PR targeting the specified branch
   - Cherry-pick the commits from the original PR
   - Link back to the original PR

3. Review and merge the backport PR as normal

If the backport fails due to conflicts, you'll need to manually create the backport PR and resolve conflicts.

### Patch Releases

After backporting fixes to a release branch, you can publish a patch release without merging back to main:

1. **Merge the backport PR** to the release branch (e.g., `release/2.46`)
   - This automatically publishes alpha versions for testing (e.g., `2.46.0-alpha.abc1234`)

2. **Trigger the Patch Release workflow** when ready to publish:
   - Go to Actions → "Patch Release" → "Run workflow"
   - Enter the release branch name (e.g., `release/2.46`)
   - Click "Run workflow"

3. **Review and merge the release PR**:
   - Release-please creates a PR on the release branch with version bump (e.g., `2.46.0` → `2.46.1`)
   - Review the PR to verify the changes and version
   - Merge the PR to publish the patch release

4. **Packages are published**:
   - All packages published to GitHub Package Registry with the `latest` tag
   - GitHub Release created with patch version (e.g., `2.46.1`)
   - Release branch maintains its own version history separate from main

This allows you to maintain multiple release lines simultaneously. For example:
- `main` branch continues with new features (2.47.0, 2.48.0, etc.)
- `release/2.46` can receive bug fixes (2.46.1, 2.46.2, etc.)
- `release/2.45` can receive critical security patches (2.45.3, 2.45.4, etc.)

```
