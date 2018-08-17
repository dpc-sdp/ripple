# Card Content (base)

> A base component for building new card compoennts. This is not designed
to be used as-is, but to be extended upon for new cards.

## Properties

### Link

An object with the Call to Action text, and link. Relative links show a right
arrow, external links show the external link icon.

```js
{
  "text": "Call to action",
  "url": "/my-link"
}
```

### Image

A URL to an image which displays at the top of the card. If blank no image
will show.

### Border

Show / hide a top border style. If an image is supplied, then this border
will not show.

### Type

The style configuration for the card to use. There are two types:

* default

* simple

#### Default

Best for use with cards which display in columns at large breakpoints.

Includes:

* Various fixed heights for medium breakpoints and above.

* No outer borders at smaller breakpoints.

* Border above Call to Action.

* Various padding changes.

* Consistent Call to Action font size.

#### Simple

Best for use with cards that take full width at large breakpoints.

Includes:

* Variable height.

* Outer borders always visible.

* No border above Call to Action.

* Various padding changes.

* Variable Call to Action font size.

### HTML Content

--------------------------------------------------------------------------------

## Release History

See [CHANGELOG.md](./CHANGELOG.md).

--------------------------------------------------------------------------------

## License

Licensed under the GPL-2.0+ License.
