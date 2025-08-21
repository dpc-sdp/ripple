import type { ContentNavigationItem } from '@nuxt/content'
import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

export const useDocsNavigation = async (
  slug: string[]
): Promise<IRplVerticalNavItem[] | null> => {
  const route = useRoute()

  const routePath = computed(() => {
    return route.path.replace(/\/$/, '')
  })

  const isActive = (nuxtNavItem: ContentNavigationItem) => {
    if (nuxtNavItem.children && nuxtNavItem.children.length) {
      return routePath.value.startsWith(nuxtNavItem.path)
    }

    return routePath.value === nuxtNavItem.path
  }

  const transformToRplNavFormat = (
    nuxtNavItem: ContentNavigationItem
  ): IRplVerticalNavItem => {
    return {
      id: nuxtNavItem.path,
      text: nuxtNavItem.title,
      url: nuxtNavItem.path,
      active: isActive(nuxtNavItem),
      items: nuxtNavItem.children
        ? nuxtNavItem.children
            .filter((child) => child.path !== nuxtNavItem.path)
            .map(transformToRplNavFormat)
        : undefined
    }
  }

  const { data: nav } = await useAsyncData(
    `navigation-${slug.join('-')}`,
    () => {
      const query = queryCollectionNavigation('content')
      if (!import.meta.dev) {
        query.where('published', '=', true)
      }
      return query
    },
    {
      transform: (data) => {
        return data.find((item) => item.path === `/${slug.join('/')}`)
      }
    }
  )

  return (nav.value?.children || []).map(transformToRplNavFormat)
}

export default useDocsNavigation
