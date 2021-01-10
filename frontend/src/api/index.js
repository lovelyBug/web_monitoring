import axios from 'axios'

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