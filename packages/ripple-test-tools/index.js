
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
    createEventPage (data) {
      return new TideAdmin().createEventPage(data)
    },
    createUser (user) {
      return new TideAdmin().createUser(user)
    },
    createNodeFromYAML (yamlFixture) {
      return new TideAdmin().createNodeFromYAML(yamlFixture)
    },
    configureProtectedContent (options) {
      return new TideAdmin().configureProtectedContent(options)
    },
    deleteNode (nodeId) {
      return new TideAdmin().deleteNode(nodeId)
    },
    createUserRole (role) {
      return new TideAdmin().createUserRole(role)
    },
    configureAuthContent (options) {
      return new TideAdmin().configureAuthContent(options)
    },
    log (message) {
      console.log(message)
      return null
    }
  })

  return config
}
