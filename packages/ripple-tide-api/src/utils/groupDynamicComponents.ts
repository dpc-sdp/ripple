import {
  TideDynamicComponentGroup,
  TideDynamicPageComponent
} from '../../types'

type GroupOrComponent =
  | TideDynamicPageComponent<any>
  | TideDynamicComponentGroup

const groupDynamicComponents = (
  components: TideDynamicPageComponent<any>[]
): GroupOrComponent[] => {
  let groupCounter = 0
  return components.reduce((acc, curr: TideDynamicPageComponent<any>) => {
    if (curr.layout) {
      const top = acc.length ? acc[acc.length - 1] : null

      if ((top as TideDynamicComponentGroup)?.grouping === curr.layout) {
        return [
          ...acc.slice(0, -1),
          {
            ...(top as TideDynamicComponentGroup),
            components: [...(top as TideDynamicComponentGroup).components, curr]
          }
        ]
      } else {
        groupCounter += 1

        return [
          ...acc,
          {
            id: `__group${groupCounter}`,
            grouping: curr.layout,
            components: [curr]
          }
        ]
      }
    } else {
      return [...acc, curr]
    }
  }, [] as GroupOrComponent[])
}

export default groupDynamicComponents
