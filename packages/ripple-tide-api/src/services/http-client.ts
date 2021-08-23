import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly client: AxiosInstance

  public constructor(config) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      auth: config.auth,
      paramsSerializer: function(params) {
        return qs.stringify(params, { arrayFormat: 'brackets', indices: false })
      }
    })

    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.client.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    )
  }

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: any) => Promise.reject(error)
}