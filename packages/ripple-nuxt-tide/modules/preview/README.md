# Preview

The preview module provides functionality for preview links via OAUTH, and
share links.

## Usage

### Enable module

Ensure `nuxt.config.js` has the following changes:

- the preview module is enabled

```js
{
  tide: {
    modules: {
      preview: 1
    }
  }
}
```

Add `CONTENT_API_OAUTH_CLIENT_ID` to `.env`.
This value can be found from within the content site `/admin/config/services/consumer`.
It will be the client UUID for the `editor` role.

```
CONTENT_API_OAUTH_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
