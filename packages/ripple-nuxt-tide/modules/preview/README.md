# Preview

The preview module provides functionality for preview links via OAUTH, and
share links.

## Usage

### Enable module

Ensure `nuxt.config.js` has the following changes:

- the preview module is enabled
- the oauth client ID is set from a process environment variable

```js
{
  tide: {
    modules: {
      preview: 1
    },
    oauth: {
      clientId: process.env.CONTENT_API_OAUTH_CLIENT_ID
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
