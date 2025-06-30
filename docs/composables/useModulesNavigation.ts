import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

export const useModulesNavigation = async (): Promise<
  IRplVerticalNavItem[] | []
> => {
  const route = useRoute()

  const { data: nav } = await useAsyncData('modules-navigation', () => {
    return queryCollection('modules').all()
  })

  return (nav.value || []).map(
    (item): IRplVerticalNavItem => ({
      id: item.id,
      text: item.name,
      url: item.meta.path?.replace(/\/module$/, ''),
      active: item.meta.path?.startsWith(route.path)
    })
  )
}

export default useModulesNavigation
