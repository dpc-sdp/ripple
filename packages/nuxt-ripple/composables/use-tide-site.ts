export default async (site: string | undefined) => {
  const baseURL = '/api/site'
  // @ts-ignore
  const { data } = await $fetch(`${baseURL}/site`, {
    params: {
      site
    }
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
