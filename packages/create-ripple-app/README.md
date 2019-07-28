# Create Ripple App

> Create a [Ripple](https://github.com/dpc-sdp/ripple) website using the [Nuxt.js](https://github.com/nuxt/nuxt.js) framework in seconds

<details><summary>Preview</summary>

![preview](/packages/create-ripple-app/docs/create-ripple-app.gif)
</details>

## Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since [npm](https://www.npmjs.com/get-npm) `5.2.0`)

```bash
npx create-ripple-app <my-project>
```

## Options config 

There are several methods of providing config options

1. JSON file

You can provide a JSON file with the key/values to populate by  passing the --config parameter, eg:

`create-ripple-app --config example.json`

The JSON file should include the keys to populate, if there are missing keys you will then be asked to interactively add them. 

Example JSON file

```
{
  "name": "projectname",
  "author": "DPC",
  "description": "My great project",
  "modules": ["site", "alert", "grants"],
  "backendurl": "http://develop.content.vic.gov.au",
  "siteid": "4",
  "authuser": "shielduser",
  "authpass": "shieldpass",
  "gtmtoken": "GTM-123456-1"
}
```
2. Commandline parameters

You can pass all options as parameters to create-ripple-app eg:

`create-ripple-app --name projectname --author DPC --modules grant,site,alert,authenticatedContent --siteid 4 --authuser userid --authpass userpass --gtmtoken GTM-123456-1`

3. Interactively

If no parameters are  passed (or if required parameters are missing) then you will be asked for each missing option interactively. To choose modules use the arrow keys to move and space bar to make a selection.

## Credits

- ([Create Nuxt App](https://github.com/nuxt/create-nuxt-app/contributors)).
