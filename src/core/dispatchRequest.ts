import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { processHeaders } from '../helper/header'
import xhr from './xhr'
import { transformRequest, transformResponse } from '../helper/data'
import { buildUrl } from '../helper/url'

const dispatchRequest = (config: AxiosRequestConfig): AxiosPromise => {
  // 发请求之前，先要对配置项进行处理
  processConfig(config)
  return xhr(config).then(transformResponseData)
}
const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  // The syntax is postfix !: identifier! removes null and undefined from the type of identifier
  return buildUrl(url!, params)
}
const transformRequestData = (config: AxiosRequestConfig) => {
  const { data } = config
  return transformRequest(data)
}
const transformHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
const transformResponseData = (response: AxiosResponse) => {
  const { data } = response
  response.data = transformResponse(data)
  return response
}
export default dispatchRequest
