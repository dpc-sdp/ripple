export const isSharePath = (path: string): boolean => {
  return path.indexOf('/share_link/') === 0
}

export const getDpcPkgs = (
  inputObject: Record<string, any>,
  prefix: string = '@dpc-sdp/'
) => {
  return Object.keys(inputObject).reduce((acc: Record<string, any>, key) => {
    if (key.startsWith(prefix)) {
      acc[key.replace(prefix, '')] = inputObject[key]
    }
    return acc
  }, {})
}
