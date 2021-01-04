import { tidePreview, tidePreviewLogin, tidePreviewSuccessRedirect } from './../../modules/preview/lib/helpers'

describe('tidePreview', () => {
  it('when not logged in will redirect to login page', async () => {
    const result = await tidePreview({
      $auth: {
        loggedIn: false
      },
      req: {
        url: '/preview/page'
      },
      redirect: (url) => {
        return { url }
      }
    })
    expect(result.url).toEqual('/oauth/login?destination=/preview/page')
  })

  it('when logged in will use tide.getPageByPreviewLink to return page data', async () => {
    const result = await tidePreview({
      $auth: {
        loggedIn: true
      },
      route: {
        path: 'pathTest',
        query: {
          section: 'sectionTest'
        }
      },
      store: {
        state: {
          tide: {
            siteId: 4
          }
        }
      },
      app: {
        $tide: {
          getEntityByPathData: (pathData, params, headersConfig) => {
            return `{
              "jsonapi": { "version": "1.0", "meta": { "links": { "self": { "href": "http://jsonapi.org/format/1.0/" } } } },
              "data": {
                "type": "test_type",
                "id": "test_id",
                "links": {
                  "self": {
                    "href": "test"
                  }
                }
              },
              "links": { "self": { "href": "test" } }
            }`
          }
        }
      }
    }, {
      requestId: 1
    })
    expect(result.id).toEqual('test_id')
    expect(result.type).toEqual('test_type')
  })
})

describe('tidePreviewLogin', () => {
  it('login with destination - localStorage saved', async () => {
    let storageValue = null
    let loginCalled = false
    const route = {
      query: {
        destination: 'test'
      }
    }
    const auth = {
      loggedIn: false,
      loginWith: () => {
        loginCalled = true
      }
    }
    const storage = {
      setItem: (key, destination) => {
        storageValue = { [key]: destination }
      }
    }
    await tidePreviewLogin(route, auth, storage)
    expect(storageValue['login-destination']).toEqual('test')
    expect(loginCalled).toEqual(true)
  })

  it('login with no destination - no localStorage saved', async () => {
    let storageValue = null
    let loginCalled = false
    const route = {
      query: {}
    }
    const auth = {
      loggedIn: false,
      loginWith: () => {
        loginCalled = true
      }
    }
    const storage = {
      setItem: (key, destination) => {
        storageValue = { [key]: destination }
      }
    }
    await tidePreviewLogin(route, auth, storage)
    expect(storageValue).toEqual(null)
    expect(loginCalled).toEqual(true)
  })

  it('login with code query and not loggged in - no action', async () => {
    let storageValue = null
    let loginCalled = false
    const route = {
      query: {
        code: 'test'
      }
    }
    const auth = {
      loggedIn: false,
      loginWith: () => {
        loginCalled = true
      }
    }
    const storage = {
      setItem: (key, destination) => {
        storageValue = { [key]: destination }
      }
    }
    await tidePreviewLogin(route, auth, storage)
    expect(storageValue).toEqual(null)
    expect(loginCalled).toEqual(false)
  })
})

describe('tidePreviewSuccessRedirect', () => {
  it('redirect with destination - localStorage found', async () => {
    let redirectSet = false
    let removedStorage = false
    const router = {
      replace: (route) => {
        redirectSet = (route.path === '/test')
      }
    }
    const storage = {
      getItem: (key) => {
        return (key === 'login-destination') ? '/test' : ''
      },
      removeItem: (key) => {
        removedStorage = (key === 'login-destination')
      }
    }
    tidePreviewSuccessRedirect(router, storage)
    expect(removedStorage).toEqual(true)
    expect(redirectSet).toEqual(true)
  })

  it('redirect with no destination - no localStorage found', async () => {
    let redirectSet = false
    const router = {
      replace: (route) => {
        redirectSet = (route.path === '/')
      }
    }
    const storage = {
      getItem: (key) => {
        return false
      }
    }
    tidePreviewSuccessRedirect(router, storage)
    expect(redirectSet).toEqual(true)
  })
})
