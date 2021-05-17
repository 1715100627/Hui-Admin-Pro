<template>
  <div class="user_list-page flexC">
    <Tabs value="name1">
      <TabPane label="用例结果" name="name1">
        <div class="user_list-page">
          <div class="user_list-page" style="margin-bottom: 20px;">
            <div class="pageHead">
              <p>用例结果查询</p>
            </div>
            <div class="pageHead">
              <Form ref="searchForm" :model="searchForm" inline :label-width="80">
                <FormItem label="用例名称" prop="name">
                  <Input
                      type="text"
                      v-model="searchForm.title"
                      placeholder="请输入环境名称"
                      clearable
                      style="width: 200px"
                  />
                </FormItem>
                <FormItem label="所属项目" prop="is_active">
                  <Select
                      v-model="searchForm.status"
                      placeholder="请选择"
                      clearable
                      style="width: 200px"
                  >
                    <Option value="0" disabled>激活</Option>
                    <Option value="-1" disabled>禁用</Option>
                  </Select>
                </FormItem>
                <FormItem label="请求接口" prop="is_active">
                  <Select
                      v-model="searchForm.status"
                      placeholder="请选择"
                      clearable
                      style="width: 200px"
                  >
                    <Option value="0" disabled>激活</Option>
                    <Option value="-1" disabled>禁用</Option>
                  </Select>
                </FormItem>
                <FormItem label="测试结果" prop="is_active">
                  <Select
                      v-model="searchForm.status"
                      placeholder="请选择"
                      clearable
                      style="width: 200px"
                  >
                    <Option value="0" disabled>激活</Option>
                    <Option value="-1" disabled>禁用</Option>
                  </Select>
                </FormItem>
                <FormItem style="margin-left: -35px" class="br">
                  <Button @click="handleSearch" type="primary" icon="ios-search" style="
               margin-right: 10px;"
                  >搜索
                  </Button>
                  <Button @click="handleReset">重置</Button>
                </FormItem>
              </Form>
            </div>


          </div>
          <div class="pageHead" style="padding-left: 0px;">

            <!--              创建环境-->
            <div class="pageHead">
              <!--        创建环境-->
              <div style="display: flex;justify-content: space-between">
                <p>结果列表</p>
                <div>
                  <Icon type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                  <i style="margin-right: 15px;">通过</i>
                  <Icon type="ios-leaf" size="24" color="rgb(255, 153, 0)"/>
                  <i style="margin-right: 15px;">部分通过</i>
                  <Icon type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                  <i style="margin-right: 15px;">失败</i>
                  <Button type="warning" size="small">临时删除</Button>
                  <Button type="error" size="small" style="margin-left: 10px;">永久删除</Button>
                </div>
              </div>
            </div>
            <!--              用例环境列表-->
            <div class="pageHead">
              <Table
                  border
                  :columns="columns"
                  :data="data"
                  sortable="custom"
                  ref="table"
                  size="small"
              >
                <template slot-scope="{ row }" slot="project|interface">
                  <strong>{{ row.project_name }} - {{ row.api_name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="icon">
                  <Icon v-if="row.status == 'PASS'" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                  <Icon v-if="row.status == 'FAIL'" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                </template>
              </Table>
              <div>
                <Page
                    :total="page.total"
                    :page-size="page.size"
                    :current="page.index"
                    show-total
                    show-elevator
                    show-sizer
                    @on-change="changeSize"
                    @on-page-size-change="changePage"
                    style="margin-top: 20px;"
                />
              </div>
            </div>
          </div>
        </div>
      </TabPane>


      <TabPane label="场景结果" name="name2">
        <div class="user_list-page">
          <div class="user_list-page" style="margin-bottom: 20px;">
            <div class="pageHead">
              <p>场景结果查询</p>
            </div>
            <div class="pageHead">
              <Form ref="searchForm" :model="searchForm" inline :label-width="80">
                <FormItem label="场景名称" prop="name">
                  <Input
                      type="text"
                      v-model="searchForm.title"
                      placeholder="请输入环境名称"
                      clearable
                      style="width: 200px"
                  />
                </FormItem>
                <FormItem label="所属项目" prop="is_active">
                  <Select
                      v-model="searchForm.status"
                      placeholder="请选择"
                      clearable
                      style="width: 200px"
                  >
                    <Option value="0" disabled>激活</Option>
                    <Option value="-1" disabled>禁用</Option>
                  </Select>
                </FormItem>
                <FormItem label="测试结果" prop="is_active">
                  <Select
                      v-model="searchForm.status"
                      placeholder="请选择"
                      clearable
                      style="width: 200px"
                  >
                    <Option value="0" disabled>激活</Option>
                    <Option value="-1" disabled>禁用</Option>
                  </Select>
                </FormItem>
                <FormItem style="margin-left: -35px" class="br">
                  <Button @click="handleSearch" type="primary" icon="ios-search" style="
               margin-right: 10px;"
                  >搜索
                  </Button>
                  <Button @click="handleReset">重置</Button>
                </FormItem>
              </Form>
            </div>


          </div>
          <div class="pageHead" style="padding-left: 0px;">

            <div class="pageHead">
              <!--        创建环境-->
              <div style="display: flex;justify-content: space-between">
                <p>结果列表</p>
                <div>
                  <Icon type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                  <i style="margin-right: 15px;">全部通过</i>
                  <Icon type="ios-leaf" size="24" color="rgb(255, 153, 0)"/>
                  <i style="margin-right: 15px;">部分通过</i>
                  <Icon type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                  <i style="margin-right: 15px;">全部失败</i>
                  <Button type="warning" size="small">临时删除</Button>
                  <Button type="error" size="small" style="margin-left: 10px;">永久删除</Button>
                </div>
              </div>
            </div>
            <!--              用例环境列表-->
            <div class="pageHead">
              <Table
                  border
                  :columns="testsuitecolumns"
                  :data="suitedata"
                  sortable="custom"
                  ref="table"
                  size="small"
              >
                <template slot-scope="{ row }" slot="project|testsuite">
                  <strong>{{ row.project_name }} - {{ row.testsuite_name }}</strong>
                </template>

                <template slot-scope="{ row }" slot="icon">
                  <Icon v-if="row.failed_num <= 0" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/> <!--全部通过-->
                  <Icon v-else-if="row.passed_num < 1" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/> <!--全部失败-->
                  <Icon v-else type="ios-leaf" size="24" color="rgb(255, 153, 0)"/> <!--部分通过-->
                </template>
              </Table>
              <div>
                <Page
                    :total="page.total"
                    :page-size="page.size"
                    :current="page.index"
                    show-total
                    show-elevator
                    show-sizer
                    @on-change="changeSize"
                    @on-page-size-change="changePage"
                    style="margin-top: 20px;"
                />
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>


  </div>
</template>

<script>
import { test_reports,testsuite_reports } from '../../api/api'

export default {
  name: "testcase_reports",
  data() {
    return {
      page: {
        index: 1,
        size: 10,
        total: 50
      },
      searchForm: {},
      data: [],
      suitedata: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "用例名称",
          key: "testcase_name",
          minWidth: 125,
          width: 300,
          align: 'center'
        },
        {
          title: "项目|接口",
          slot: "project|interface",
          minWidth: 200,
          align: 'center'
        },
        {
          title: "请求URL",
          key: "url",
          width: 200,
          minWidth: 200,
        },
        {
          title: "响应状态码",
          key: "actual_status_code",
          width: 120,
          align: 'center'
        },
        {
          title: "响应时长(ms)",
          key: "elapsed_ms",
          align: "center",
          width: 120,
        },
        {
          title: "响应结果",
          key: "actual_response_data",
          align: "center",
          width: 200,
          ellipsis: true,
          render: (h, params) => {
            let texts = params.row.actual_response_data
            if (params.row.actual_response_data != null) {
              if (params.row.actual_response_data.length > 30) {
                texts = params.row.actual_response_data.slice(0, 30) + '...' // 进行数字截取
              } else {
                texts = params.row.actual_response_data
              }
            }
            return h('div', [
              h('Tooltip', {
                props: {
                  placement: 'top',
                  transfer: true
                }
              }, [texts, h('span', {
                slot: 'content',
                style: {
                  whiteSpace: 'normal'
                }
              }, params.row.actual_response_data)
              ])
            ])
          }
        },
        {
          title: "失败原因",
          key: "failure_reason",
          align: "center",
          width: 200,
          render: (h, params) => {
            let texts = params.row.failure_reason
            if (params.row.failure_reason != null) {
              if (params.row.failure_reason.length > 20) {
                texts = params.row.failure_reason.slice(0, 20) + '...' // 进行数字截取
              } else {
                texts = params.row.failure_reason
              }
            }
            return h('div', [
              h('Tooltip', {
                props: {
                  placement: 'top',
                  transfer: true
                }
              }, [texts, h('span', {
                slot: 'content',
                style: {
                  whiteSpace: 'normal'
                }
              }, params.row.failure_reason)
              ])
            ])
          }
        },
        {
          title: "执行时间",
          key: "execute_time",
          align: "center",
          width: 150,
        },
        {
          title: "版本",
          key: "version",
          align: "center",
          width: 130,
        },
        {
          title: "测试结果",
          slot: 'icon',
          align: "center",
          fixed: "right",
          width: 85,
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let enableOrDisable = "";
            {
              enableOrDisable = h(
                  "a",
                  {
                    style: {
                      color: '#19B16B'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                      },
                    },
                  },
                  "报告"
              );
            }
            return h("div", [
              h(
                  "a",
                  {

                    on: {
                      click: () => {
                        this.enable('crenvs2', params.row);
                      },
                    },
                  },
                  "详情"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              enableOrDisable,
            ]);

          },
        },
      ],
      testsuitecolumns:[
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "项目|场景",
          slot: "project|testsuite",
          minWidth: 125,
          width: 300,
          align: 'center'
        },
        {
          title: "用例总数",
          key: "total_num",
          minWidth: 200,
          align: 'center'
        },
        {
          title: "通过数量",
          key: "passed_num",
          width: 200,
          minWidth: 200,
        },
        {
          title: "失败数量",
          key: "failed_num",
          width: 120,
          align: 'center'
        },
        {
          title: "执行耗时(ms)",
          key: "elapsed_ms",
          align: "center",
          width: 120,
        },
        {
          title: "执行时间",
          key: "execute_time",
          align: "center",
          width: 150,
        },
        {
          title: "版本",
          key: "version",
          align: "center",
          width: 130,
        },
        {
          title: "测试结果",
          slot: 'icon',
          align: "center",
          fixed: "right",
          width: 85,
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let enableOrDisable = "";
            {
              enableOrDisable = h(
                  "a",
                  {
                    style: {
                      color: '#19B16B'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                      },
                    },
                  },
                  "报告"
              );
            }
            return h("div", [
              h(
                  "a",
                  {

                    on: {
                      click: () => {
                        this.testsuiteenable('crenvs2', params.row);
                      },
                    },
                  },
                  "详情"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              enableOrDisable,
            ]);

          },
        },
      ],
    }
  },

  created() {
    this.getlist()
    this.gettestsuitelist()
  },
  methods: {
    gettestsuitelist() {
      testsuite_reports().then(res => {
        this.suitedata = res.data.data
      })
    },

    getlist() {
      let data = {
        'size': this.page.size,
        'page': this.page.index,
        'ordering': '-execute_time'
      }
      test_reports(data).then(res => {
        let data = res.data.data.data
        this.data = data
        this.page.total = res.data.count
      })
    },

    enable(name, v) {
      this.$router.push({
        name: 'testcase_reports_details',
        params: {
          id: v.id
        }
      })
    },

    testsuiteenable(name, v) {
      this.$router.push({
        name: 'testsuite_reports_details',
        params: {
          id: v.id
        }
      })
    },

    edit(v) {
      this.$router.push({
        name: 'reports',
        params: {
          id: v.version
        }
      })
    },
    changeSize(e) {
      let data = {
        'size': this.page.size,
        'page': e,
        'ordering': '-execute_time'
      }
      test_reports(data).then(res => {
        let data = res.data.data.data
        this.data = data
        this.page.total = res.data.count

      })
    },
    changePage(e) {
      let data = {
        'size': e,
        'page': this.page.index,
        'ordering': '-execute_time'
      }
      test_reports(data).then(res => {
        let data = res.data.data.data
        this.data = data
        this.page.total = res.data.count
      })
    }
  }
}
</script>

<style scoped>

</style>