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

## Import

```js
{{ packageImports }}
```

--------------------------------------------------------------------------------

## Usage and Tests

{% for key, story in storybookParams %}
{% if key != 0 %}

{% endif %}
<!-- markdownlint-disable MD034 -->
See [{{ story.path }}](https://ripple.sdp.vic.gov.au/{{story.params}}).
<!-- markdownlint-enable MD034 -->
{% endfor %}

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.
