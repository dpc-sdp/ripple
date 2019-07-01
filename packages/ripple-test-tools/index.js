
const TideAdmin = require('./tide-admin')

module.exports = (on, config) => {
  on('task', {
    createLandingPage (data) {
      return new TideAdmin().createLandingPage(data)
    },
    deleteUser (userId) {
      return new TideAdmin().deleteUser(userId)
    },
    createGrantPage (data) {
      return new TideAdmin().createGrantPage(data)
    },
    createUser (user) {
      return new TideAdmin().createUser(user)
    },
    configureProtectedContent (options) {
      return new TideAdmin().configureProtectedContent(options)
    },
    deleteNode (userId) {
      return new TideAdmin().deleteNode(userId)
    }
  })

  return config
}
