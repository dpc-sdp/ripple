{% if packageImports %}
## Import

```js
{{ packageImports }}
```
{% endif %}
{% if packageImports and noSsrPackageImports %}

{% endif %}
{% if noSsrPackageImports %}
## Import for client-only components

```js
{{ noSsrPackageImports }}
```
{% endif %}
