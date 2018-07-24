# {{ packageName }}

> {{ packageDescription }}

--------------------------------------------------------------------------------

## Install

```shell
npm install {{ packageName }} --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
{{ packageName }}
{{ packageDependencies }}
```

--------------------------------------------------------------------------------

## Usage and Tests

{% for key, story in storybookParams %}
{% if key != 0 %}

{% endif %}
<!-- markdownlint-disable MD034 -->
See [{{ story.path }}](https://ripple-ripple-develop.lagoon.vicsdp.amazee.io/{{story.params}}).
<!-- markdownlint-enable MD034 -->
{% endfor %}

--------------------------------------------------------------------------------

## Release History

See [CHANGELOG.md](./CHANGELOG.md).

--------------------------------------------------------------------------------

## License

Licensed under the GPL-2.0+ License.
