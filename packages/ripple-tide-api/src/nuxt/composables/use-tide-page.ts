declare const useRoute: any
declare const useFetch: any

export const useTidePage = async () => {
  const route = useRoute()
  const { data } = await useFetch(`/api/tide/page?path=${route.path}`, {
    baseUrl: 'http://localhost:3000'
  })
  return data
}
