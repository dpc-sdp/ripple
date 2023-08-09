# Nuxt Ripple CLI

> CLI for simplifying common setup and scaffolding tasks.

## Installation

Either install the CLI install it globally using `npm install -g @dpc-sdp/nuxt-ripple-cli` or run it directly using `npx @dpc-sdp/nuxt-ripple-cli`.

If you've installed the package globally you can now use the `nuxt-ripple` command in your terminal. 

> **Note:**
> If you prefer to run the CLI using `npx` you won't be able to use the `nuxt-ripple` command and will instead need to use `npx @dpc-sdp/nuxt-ripple-cli` in place of `nuxt-ripple`. For instance `npx @dpc-sdp/nuxt-ripple-cli init site my-site --name "My Site"`.

## Commands

### Init

The `init` command will initialise a new site or layer.

```
nuxt-ripple init [TEMPLATE] [DIRECTORY] --name {NAME} --rplVersion {RPL_VERSION}
```

`[TEMPLATE]`:
- `site` Scaffolds a new nuxt site.
- `layer` Scaffolds a new nuxt layer.

`[DIRECTORY]`: The directory to output scaffolded files into.

`--name {NAME}`: The name of the site or layer.

`--rplVersion {RPL_VERSION}`: The version of the ripple core dependencies to use.

### Add

The `add` command will create a ripple component or content type.

```bash
nuxt-ripple add <command> [DIRECTORY]
```

`<command>`:
- `component` Scaffolds a new Ripple (vue) component, note that the component folder is created as well to follow Ripple naming conventions.
- `content-type` Scaffolds a new Ripple Tide content type.

#### Add Component

```bash
nuxt-ripple add component [DIRECTORY] --name {NAME} --prefix {PREFIX}
```

`[DIRECTORY]`: The directory to output the component scaffolding.

`--name {NAME}`: The name of new Vue component.

`--prefix {PREFIX}`: The prefix to used for the Vue components.

#### Add Content Type

```bash
nuxt-ripple add content-type [DIRECTORY] --name {NAME} --rplVersion {RPL_VERSION} --createTests --cypressPath {CYPRESSPATH}
```

`[DIRECTORY]`: The directory to output the content type scaffolding.

`--name {NAME}`: The name of the project or layer.

`--rplVersion {RPL_VERSION}`: The version of the ripple core dependencies to use.

`--createTests` or `-T`: A flag to opt into example tests.

`--cypressPath {CYPRESSPATH}`: The path to the Cypress support folder, this is used when opting into the example tests.

### Mock

The `mock` command will start a mock server for testing Ripple sites without a Tide backend.

```bash
nuxt-ripple mock [FIXTURE_PATH] --routes {ROUTE_PATH} --site {SITE_PATH}
```

`[FIXTURE_PATH]`: The path to the fixture, i.e. the mocked data

`--routes {ROUTE_PATH}`: The path to the JSON routes file; example route file: `[{ "path": "/", "fixture": "home.json" }]`.

`--site {SITE_PATH}`: The relative (to `[FIXTURE_PATH]`) path to mocked global site data

