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

export function getApiErrInfoByType(data) {
  return axios({
    url: '/getApiErrInfoByType',
    method: 'GET',
    params: data
  })
}

export function getApiErrInfoById(data) {
  return axios({
    url: '/getApiErrInfoById',
    method: 'GET',
    params: data
  })
}
