import request from './request'

// 获取环境列表
export function envlist(data) {
  return request({
    url: '/envs/',
    method: 'get',
    params:data
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
export function projectlist(data) {
  return request({
    url: '/projects/',
    method: 'get',
    params:data
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
    url: '/projadd/',
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
    url: '/projadd/' + id + '/',
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
export function apilist(data) {
  return request({
    url: `/interfaces/`,
    method: 'get',
    params:data
  })
}

// 获取模块列表
export function modulelist(data) {
  return request({
    url: '/module/',
    method: 'get',
    params:data
  })
}

// 获取环境名称
export function envnamelist() {
  return request({
    url: '/envs/names/',
    method: 'get',
  })
}


// 查询项目下模块
export function findmodule(id) {
  return request({
    url: '/module/'+id+'/findmodule/',
    method: 'post',
    data: {'projectId':id},
  })
}

// 创建根模块
export function moduleadd(data) {
  return request({
    url: '/moduleadd/',
    method: 'post',
    data
  })
}

// 查询项目下模块
export function modulenames(id) {
  return request({
    url: '/module/'+id+'/names/',
    method: 'get',
  })
}


// 修改模块
export function updatamodule(id,data) {
  return request({
    url: '/moduleadd/' + id + '/',
    method: 'put',
    data
  })
}

// 删除模块
export function dedatamodule(id) {
  return request({
    url: '/moduleadd/' + id + '/',
    method: 'delete',
  })
}


// 创建接口
export function crinter(data) {
  return request({
    url: '/interfaadd/',
    method: 'post',
    data
  })
}

// 编辑接口
export function upinter(id,data) {
  return request({
    url: '/interfaadd/'+id+'/',
    method: 'put',
    data
  })
}

// 接口搜索
export function interreads(data) {
  return request({
    url: '/interfaces/reads/',
    method: 'post',
    data: data
  })
}


// 删除接口
export function interfacede(id) {
  return request({
    url: '/interfaces/' + id + '/',
    method: 'delete'
  })
}


// 用例列表
export function testcaselist(data) {
  return request({
    url: '/testcaseslist/',
    method: 'get',
    params:data
  })
}

// 创建用例
export function createstcase(data) {
  return request({
    url: '/testcases/',
    method: 'post',
    data:data,
  })
}

// 用例调试
export function testdebug(data) {
  return request({
    url: '/testcases/debug/',
    method: 'post',
    data:data,
  })
}

// 更新用例
export function uptest(id,data) {
  return request({
    url: '/testcases/'+id+'/',
    method: 'put',
    data:data,
  })
}


// 部分更新用例
export function partial(id,data) {
  return request({
    url: '/testcases/'+id+'/',
    method: 'PATCH',
    data:data,
  })
}


// 用例报告列表
export function test_reports(data) {
  return request({
    url: '/testcase_reports/',
    method: 'get',
    params:data
  })
}

// 场景报告列表
export function testsuite_reports(data) {
  return request({
    url: '/testsuite_reports/',
    method: 'get',
    params:data
  })
}

// 场景报告ID查询
export function testsuite_reportsId(id) {
  return request({
    url: '/testsuite_reports/'+id+'/',
    method: 'get',
  })
}

// 用例详情页
export function get_test_reports(id) {
  return request({
    url: '/testcase_reports/'+id+'/',
    method: 'get',
  })
}

// 用例报告页
export function reports(data) {
  return request({
    url: '/reports_details/',
    method: 'get',
    params:data
  })
}



// 用例批量执行
export function testcase_Batch(data) {
  return request({
    url: '/testcases/batch/',
    method: 'post',
    data:data
  })
}


// 场景列表
export function testsuitelist() {
  return request({
    url: '/testsuite/',
    method: 'get',
  })
}

// 创建场景
export function crtestsuite(data) {
  return request({
    url: '/testsuitec/',
    method: 'post',
    data:data
  })
}

// 组织场景
export function testsuite2testcase(data) {
  return request({
    url: '/testsuite2testcase/',
    method: 'post',
    data:data
  })
}


// 组织场景列表
export function gettestsuite2testcase(data) {
  return request({
    url: '/testsuite2testcase/',
    method: 'get',
    params:data
  })
}

// 场景批量执行
export function testsuite_Batch(data) {
  return request({
    url: '/testsuite/batch/',
    method: 'post',
    data:{'testsuites':data}
  })
}