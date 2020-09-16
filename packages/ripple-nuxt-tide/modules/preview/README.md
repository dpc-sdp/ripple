# Preview

## Usage

### Enable module

Enable it in `nuxt.config.js`.

```js
{
  tide: {
    modules: {
      preview: 1
    }
  }
}
```

Add `CONTENT_API_CLIENT_ID` to `.env`.
Set value to the `editor` client UUID from `/admin/config/services/consumer`.

```
CONTENT_API_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
