<!-- GENERATED_DOCS -->
# @dpc-sdp/ripple-icon

> A configurable SVG, sprite-based icon set for use with ripple components.

--------------------------------------------------------------------------------

## Install

```shell
npm install @dpc-sdp/ripple-icon --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
@dpc-sdp/ripple-icon
└── @dpc-sdp/ripple-global
```

--------------------------------------------------------------------------------

## Import

```js
import { RplIcon, RplTextIcon } from '@dpc-sdp/ripple-icon'
```

--------------------------------------------------------------------------------

## Registering custom icons

e.g. `arrow_right.js`
```js
import Icon from '@dpc-sdp/ripple-icon'

Icon.register({
  'custom_arrow_right': {
    width: 10,
    height: 10,
    paths: [
      {
        d: 'M0 10c0 5.524 4.476 10 10 10s10-4.476 10-10S15.524 0 10 0 0 4.476 0 10zm18.065 0A8.062 8.062 0 0110 18.065 8.062 8.062 0 011.935 10 8.062 8.062 0 0110 1.935 8.062 8.062 0 0118.065 10zM10.44 4.762l4.895 4.895c.19.19.19.496 0 .686l-4.895 4.895a.484.484 0 01-.686 0l-.79-.79a.483.483 0 01.008-.694l2.834-2.706H5.323a.485.485 0 01-.484-.483v-1.13c0-.266.217-.483.484-.483h6.483L8.972 6.246a.483.483 0 01-.008-.694l.79-.79c.19-.19.496-.19.686 0z'
      }
    ]
  }
})
```

## Advanced usage

```js
import Icon from '@dpc-sdp/ripple-icon'

Icon.register({
  'custom_arrow_right': {
    width: 10,
    height: 10,
    paths: [
      {
        d: 'M2.095 6.413c-.246-.503.002-1.09.551-1.316l9.818-4.007c.554-.226 1.195.002 1.44.504.247.503 0 1.091-.55 1.317L3.536 6.916a1.16 1.16 0 01-.444.087c-.418 0-.816-.22-.997-.59z',
        transform: 'translate(0 0.00300598)'
      },
      {
        d: 'M12.907 13.003c-.178 0-.36-.04-.527-.125L2.562 7.88c-.526-.27-.717-.878-.425-1.363.293-.483.956-.657 1.483-.39l9.818 4.997c.526.27.717.879.425 1.362-.2.33-.572.516-.956.516L5.875 5.971z',
        transform: 'translate(0 0.00300598)'
      },
    ],
    polygons: []
  }
})
```

--------------------------------------------------------------------------------

## Usage and Tests

See [Storybook/Atoms/Icon/Icon Library](https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--icon-library).

See [Storybook/Atoms/Icon/Icon](https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--icon).

See [Storybook/Atoms/Icon/Text Icon](https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--text-icon).

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.

<!-- /GENERATED_DOCS -->
