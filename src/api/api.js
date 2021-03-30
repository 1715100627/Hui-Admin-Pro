import request from './request'

// 获取环境列表
export function envlist() {
  return request({
    url: '/envs/',
    method: 'get',
  })
}

// 环境搜索
export function envreads(data) {
  return request({
    url: '/envs/reads/',
    method: 'post',
    data: { 'data': data }
  })
}

// 禁启用环境,修改环境
export function envupdate(data,id) {
  return request({
    url: '/envs/' + id + '/',
    method: 'put',
    data
  })
}

// 删除环境
export function envdelete(id) {
  return request({
    url: '/envs/' + id + '/',
    method: 'delete'
  })
}

// 创建环境
export function envcreate(data) {
  return request({
    url: '/envs/',
    method: 'post',
    data
  })
}

// 修改环境
export function envsupdate(id,data) {
  return request({
    url: '/envs/' + id + '/',
    method: 'put',
    data
  })
}

// 获取项目列表
export function projectlist() {
  return request({
    url: '/projects/',
    method: 'get',
  })
}

// 项目搜索
export function projectr(data) {
  return request({
    url: '/projects/reads/',
    method: 'post',
    data: { 'data': data }
  })
}

// 创建环境
export function projectcr(data) {
  return request({
    url: '/projects/',
    method: 'post',
    data
  })
}

// 删除项目
export function projectde(id) {
  return request({
    url: '/projects/' + id + '/',
    method: 'delete'
  })
}

// 修改项目
export function projectup(id,data) {
  return request({
    url: '/projects/' + id + '/',
    method: 'put',
    data
  })
}

// 获取项目名称
export function pronames() {
  return request({
    url: '/projects/names/',
    method: 'get'
  })
}

// 获取接口列表
export function apilist() {
  return request({
    url: '/interfaces/',
    method: 'get',
  })
}