Ripple Social Channels Spec
===========================

This repo represents the social media channels recognised by Ripple for features like automatic icons.

It contains configuration information (a registry) for social channel providers, as YAML files, in the `providers`
directory.

## Consuming the provider registry

If you need to use the registry directly, you can install this package using NPM:

    npm install https://github.com/DeloitteDigitalAPAC/ripple-social-channels

That will install the providers file into `node_modules/ripple-social-channels/providers.json`, from where you can
ingest it directly.

## Maintainers: Publishing to NPM

* Increment the version in `package.json`
* `npm login` if you haven't already
* `npm publish`

## Acknowledgement

Inspired by the oEmbed Spec and package oembed-providers.

* https://npmjs.org/package/oembed-providers
* https://github.com/iamcal/oembed
