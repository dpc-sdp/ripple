/**
 * A standard property interface for passing column breakpoint settings to
 * components that manage their own children's grid.
 *
 * E.g.
 *
 * <rpl-list-of-boxes :listOfItems="[...]" />
 *
 * This component could use this mixin to allow the column size of it's
 * list of items to be defined.
 *
 * <rpl-list-of-boxes :listOfItems="[]" :childColsBp="{ l: 6, m: 4 }" />
 *
 * The component would be responsible for the implementation of this property.
 */
const provideChildCols = {
  props: {
    childColsBp: { type: Object }
  }
}

export default provideChildCols
