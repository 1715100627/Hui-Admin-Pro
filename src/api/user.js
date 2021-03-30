import request from './request'

export function login(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function editPwd(data) {
  return request({
    url: '/api/account/password/modify',
    method: 'post',
    data
  })
}
