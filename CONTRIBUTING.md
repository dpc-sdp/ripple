# Contributing

> When contributing or participating in discussions, ensure that you are following our [contributor code of conduct](https://github.com/dpc-sdp/ripple-framework/blob/develop/CODE_OF_CONDUCT.md)

## Coding standards

### Code style

Ripple uses [Prettier](https://prettier.io/) to allow developers to spend less time worrying about conforming to a specific code style. It's recommended that you set up Prettier in your IDE to format your work on save.

[ESLint](https://eslint.org/) is also used to improve code quality.

### Conventional Commits

Ripple uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to encourage meaningful commit messages. This is also for building the Ripple changelogs automatically. 

[Commitlint](https://commitlint.js.org/#/) is used to enforce the Conventional Commit format.

An example of a well formed commit message is:

```
fix(@dpc-sdp/ripple-ui-core): fixed table font size for paragraphs and lists
```

### CSS structure

Ripple uses the [BEM (block, element, modifier)](https://getbem.com/) methodology to help structure CSS and avoid naming conflicts.

All ripple classes provided by ripple are prefixed by `rpl-` to prevent conflicts with CSS in other projects or libraries.

