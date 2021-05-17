<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script>

import {test_reports} from '../../api/api'
export default {
  name: "test",
  data() {
    return {
      data:[],
      columns: [
        {
          type: "selection",
          width: 60,
        },
        {
          title: "用例名称",
          key: "testcase_name",
          minWidth: 125,
          width: 300,
        },
        {
          title: "项目|接口",
          slot: "project|interface",
          minWidth: 200,
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
          key: "status",
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
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      let data = {
        'size':10,
        'page':1,
        'ordering':'-execute_time'
      }
      test_reports(data).then(res => {
        console.log(res.data.data.data)
        this.$Message.success('成功')
        this.data = res.data.data.data
      })
    }
  },
}
</script>

<style scoped>

</style>