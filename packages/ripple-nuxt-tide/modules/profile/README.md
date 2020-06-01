# Profile

## Usage

### Enable module

Enable it in `nuxt.config.js`.

```js
{
  tide: {
    modules: {
      profile: 1
    }
  }
}
```

This will use `/profiles` as the default path for listing page.


### Options

To override the default settings.

```js
{
  tide: {
    modules: {
      profile: {
        route: '/victorian-honour-roll-of-women', // Override the default "/profiles" path.
        returnText: 'See all inductees' // Override the default return link text on profile page.
      }
    }
  }
}
```
