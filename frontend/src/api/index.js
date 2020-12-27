import axios from 'axios'

export function jsErrList(data) {
  return axios({
    url: '/jsErrList',
    method: 'GET',
    params: data
  })
}

export function jsErrDetail(data) {
  return axios({
    url: '/jsErrDetail',
    method: 'GET',
    params: data
  })
}

export function jsDayError(data) {
  return axios({
    url: '/jsDayError',
    method: 'GET',
    params: data
  })
}

export function apiErrList(data) {
  return axios({
    url: '/apiErrList',
    method: 'GET',
    params: data
  })
}

export function apiErrDetail(data) {
  return axios({
    url: '/apiErrDetail',
    method: 'GET',
    params: data
  })
}

export function apiDayError(data) {
  return axios({
    url: '/apiDayError',
    method: 'GET',
    params: data
  })
}

export function resourceErrList(data) {
  return axios({
    url: '/resourceErrList',
    method: 'GET',
    params: data
  })
}

export function resourceErrDetail(data) {
  return axios({
    url: '/resourceErrDetail',
    method: 'GET',
    params: data
  })
}

export function resourceDayError(data) {
  return axios({
    url: '/resourceDayError',
    method: 'GET',
    params: data
  })
}