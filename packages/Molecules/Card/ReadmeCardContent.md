# Card Content (base)

> A base component for building new card components. This is not designed
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

Show / hide a top border style. If an `image` is supplied, then this border
will not show.

### Type

The style configuration for the card to use. There are two types:

* default

* simple

* inline

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

#### Inline

Best for use with cards that take full width at large breakpoints.

Includes:

* Displays image to the left of content at larger breakpoints.

* Variable height.

* Displays as "Default" type at smaller breakpoints.

* Call to Action appears within content area.

### HTML Content

The custom HTML which should sit inside the content area of the card. This is
not a property of the CardContent component, but should be HTML that sits
between the component's tags.

--------------------------------------------------------------------------------

## License

Licensed under the GPL-2.0+ License.
