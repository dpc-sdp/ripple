declare const useFetch: any

export const useTideSite = async (id) => {
  const { data } = await useFetch(
    `http://localhost:3000/api/tide/site?id=${id}`
  )
  return data
}
