import { isTokenExpired } from '../../modules/authenticated-content/lib/authenticate'

describe('Authenticated content', () => {
  test('token should be expired', async () => {
    // Expiry date: January 1 2019
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDYyNjEyMDAwMDAsImV4cCI6MTU0NjI2MTIwMDAwMCwiZHJ1cGFsIjp7InVpZCI6IjEifX0.htgSTJS6-ygsTAaGT99srWiEvl6mVAjujJ_aKSb0xzw'
    const result = isTokenExpired(token)
    expect(result).toEqual(true)
  })

  test('token should not be expired', async () => {
    // Expiry date: January 1 3019
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjMzMTAzMTcwMDAwMDAwLCJleHAiOjMzMTAzMTcwMDAwMDAwLCJkcnVwYWwiOnsidWlkIjoiMSJ9fQ.HGgz_AE9sCwDKQJKRyMk1NGdes8e6Q9iNnDC8MMoAVw'
    const result = isTokenExpired(token)
    expect(result).toEqual(false)
  })
})
