import axios from 'axios'

// @todo 后续需删除
export function mockApiErr(data) {
  return axios({
    url: '/mockApiErr',
    method: 'GET',
    params: data
  })
}

export function getJsErrListByHour(data) {
  return axios({
    url: '/getJsErrListByHour',
    method: 'GET',
    params: data
  })
}


export function getJSErrInfoByHour(data) {
  return axios({
    url: '/getJSErrInfoByHour',
    method: 'GET',
    params: data
  })
}

export function getJsErrInfoByType(data) {
  return axios({
    url: '/getJsErrInfoByType',
    method: 'GET',
    params: data
  })
}

export function getJsErrInfoById(data) {
  return axios({
    url: '/getJsErrInfoById',
    method: 'GET',
    params: data
  })
}

export function getApiErrListByHour(data) {
  return axios({
    url: '/getApiErrListByHour',
    method: 'GET',
    params: data
  })
}


export function getApiErrInfoByHour(data) {
  return axios({
    url: '/getApiErrInfoByHour',
    method: 'GET',
    params: data
  })
}

export function getResourceErrListByHour(data) {
  return axios({
    url: '/getResourceErrListByHour',
    method: 'GET',
    params: data
  })
}


export function getResourceErrInfoByHour(data) {
  return axios({
    url: '/getResourceErrInfoByHour',
    method: 'GET',
    params: data
  })
}

export function getApiLogListByHour(data) {
  return axios({
    url: '/getApiLogListByHour',
    method: 'GET',
    params: data
  })
}


export function getApiLogInfoByHour(data) {
  return axios({
    url: '/getApiLogInfoByHour',
    method: 'GET',
    params: data
  })
}

export function getUserLog(data) {
  return axios({
    url: '/getUserLog',
    method: 'GET',
    params: data
  })
}