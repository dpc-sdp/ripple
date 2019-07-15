import { serverSetToken } from './../lib/authenticate'
import { Store } from 'vuex-mock-store'

describe('setServerToken', () => {
  const MockDate = require('mockdate')
  const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjMxNzA5NTcsImV4cCI6MTU2MzE3MTU1NywiZHJ1cGFsIjp7InVpZCI6IjY0OTIifX0.vEJHPrci2KBBowyRvtZot5vHCE8xFcy77bWU814BLEmrk0Zs3bvGVAgJ_SlW57uwlCbyYeSMwe8-uKqHzsrrYBugW55qvua-UfdgkJfwxeH32PXZlStVgoHsPu_BHQMpqwOh9pcH-2Lueiz-BxbT1DrYduC4R6zHBTcO-VLiW0swDPVtZHgPFWruGYgyHN8T2YWsn0ujBkLNOxD6-7FAEeY5W0X-yEHLXESjA15YDcfRebSIsvtKrZrLu21PTW9E0ql0zkLFSCip46js-f2BOc8V7jnSQM5XNwKHwrU3gtIKDhKptBQmdDLQ8KCkFhKkoyepEMoBsK_y5TWhZNOPlw'

  afterEach(() => {
    MockDate.reset()
  })

  it('should set isAuth to false when null JWT is passed in cookie', () => {
    const store = new Store({
      state: {
        tideAuthenticatedContent: {
          isAuthenticated: false
        }
      }
    })

    serverSetToken('authenticatedContent={%22tideAuthenticatedContent%22:{%22token%22:null}};', store)
    expect(store.dispatch).toHaveBeenCalledWith('tideAuthenticatedContent/setAuthenticated', false)
  })

  it('should set isAuth to true when valid JWT is passed in cookie', () => {
    MockDate.set('2019-07-15T06:19:17+00:00')

    const store = new Store({
      state: {
        tideAuthenticatedContent: {
          isAuthenticated: false
        }
      }
    })

    serverSetToken(`authenticatedContent=${validToken};`, store)
    expect(store.dispatch).toHaveBeenCalledWith('tideAuthenticatedContent/setAuthenticated', true)
  })

  it('should isAuth to false when an expired JWT is passed in cookie', () => {
    MockDate.set('2022-07-15T06:19:17+00:00')

    const store = new Store({
      state: {
        tideAuthenticatedContent: {
          isAuthenticated: false
        }
      }
    })

    serverSetToken(`authenticatedContent=${validToken};`, store)
    expect(store.dispatch).toHaveBeenCalledWith('tideAuthenticatedContent/setAuthenticated', false)
  })
})
