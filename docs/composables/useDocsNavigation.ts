import { NavItem } from '@nuxt/content/dist/runtime/types'
import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

const navItemsAtDepthN = (nav: NavItem[], depth: number): NavItem[] => {
  if (depth === 0) {
    return nav
  }

  return navItemsAtDepthN(nav[0].children, depth - 1)
}

export const useDocsNavigation = async (
  slug: string[],
  where: any = {}
): Promise<IRplVerticalNavItem[] | null> => {
  const route = useRoute()

  function isActive(nuxtNavItem: NavItem) {
    if (nuxtNavItem.children && nuxtNavItem.children.length) {
      return route.path.startsWith(nuxtNavItem._path)
    }

    return route.path === nuxtNavItem._path
  }

  const transformToRplNavFormat = (
    nuxtNavItem: NavItem
  ): IRplVerticalNavItem => {
    return {
      id: nuxtNavItem._path,
      text: nuxtNavItem.title,
      url: nuxtNavItem._path,
      active: isActive(nuxtNavItem),
      items: nuxtNavItem.children
        ? nuxtNavItem.children
            .filter((child) => child._path !== nuxtNavItem._path)
            .map(transformToRplNavFormat)
        : undefined
    }
  }

  const { data: navigation } = await useAsyncData(
    'module-navigation',
    async () => {
      const nav = await fetchContentNavigation(
        queryContent(slug.join('/')).where(where)
      )

      const sectionNav = navItemsAtDepthN(nav, 1)

      if (!sectionNav) {
        return []
      }

      return sectionNav.map(transformToRplNavFormat)
    }
  )

  return navigation.value
}

export default useDocsNavigation
