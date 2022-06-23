export default async (path: string, site: string) => {
  const baseURL = '/api/tide'
  // @ts-ignore
  const { data } = await $fetch(`/page`, {
    params: {
      path: path,
      site
    },
    baseURL
  }).catch((error) => {
    return {
      data: {
        ...error.data,
        error: true
      }
    }
  })

  return data
}
