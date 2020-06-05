const compareVersions = require('compare-versions')

// Convert old SDP version to semver
// TODO: remove this function after all sites been upgraded to 1.24.0
// 1.0.0 to 1.0.0
// 16.0.1 to 1.16.1
// 18.0.0 to 1.18.0
// 23.1.0 to 1.23.1
const convertSdpVersion = (version) => {
  switch (version) {
    case '16.0.0':
      return '1.16.0'
    case '16.0.1':
      return '1.16.1'
    case '16.1.0':
      return '1.16.1'
    case '17.0.0':
      return '1.17.0'
    case '18.0.0':
      return '1.18.0'
    case '18.1.0':
      return '1.18.1'
    case '18.2.0':
      return '1.18.2'
    case '18.3.0':
      return '1.18.3'
    case '19.0.0':
      return '1.19.0'
    case '20.0.0':
      return '1.20.0'
    case '21.0.0':
      return '1.21.0'
    case '22.0.0':
      return '1.22.0'
    case '23.0.0':
      return '1.23.0'
    case '23.1.0':
      return '1.23.1'
    default:
      return version
  }
}

// Test project current version for each update.
// If current is 20.0.0, target is 21.0.0,
// then this should return false for 20.0.0 update as it's already in 20.0.0.
// But return true for 21.0.0 update.
// Other case is if target version is 20.0.0, then update 21.0.0 won't run.
const needUpdate = (currentVersion, thisUpdateVersion, targetVersion) => {
  if (compareVersions.compare(currentVersion, thisUpdateVersion, '>=')) {
    return false
  }
  if (targetVersion === 'latest' || compareVersions.compare(targetVersion, thisUpdateVersion, '>=')) {
    return true
  }
  return false
}

module.exports = {
  convertSdpVersion,
  needUpdate
}
