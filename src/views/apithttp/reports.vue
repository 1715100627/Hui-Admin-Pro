<template>
  <div>
    <div>
      <h1 align="center">测 试 报 告</h1>
      <p align="right"  style="font-weight: bold;">{{ execute_time }}</p>

    </div>

    <div style="display: flex;align-items: center;">
      <div id="main" style="width: 300px;height:300px;"></div>
      <div style="width: 190px;height: 105px;align-items: center;">
        <p style="font-weight: bold;">用例总数：{{ testcase_count }}</p>
        <p style="font-weight: bold;">通过数量：{{ success }}</p>
        <p style="font-weight: bold;">失败数量：{{ fail }}</p>
        <p style="font-weight: bold;">通过比例：{{ success_rate }} %</p>
        <p style="font-weight: bold;">执行总耗时：{{ run_time }}</p>
      </div>
    </div>


    <div>
      <Table
          stripe
          :columns="columns"
          :data="data"
          sortable="custom"
          ref="table"
          size="small"
          max-height="400"
      >
        <template slot-scope="{ row }" slot="project|interface">
          <strong>{{ row.project_name }} - {{ row.api_name }}</strong>
        </template>
      </Table>
    </div>


  </div>

</template>

<script>

import { reports } from '../../api/api'

const echarts = require('echarts')
export default {

  name: "reports",
  data() {
    return {
      execute_time:'',
      testcase_count:'',
      success:'',
      fail:'',
      success_rate:'',
      run_time:'',
      data: [],
      columns: [
        {
          title: "用例ID",
          key: "id",
          width: 80,
          align: 'center'
        },
        {
          title: "用例名称",
          key: "testcase_name",
          width: 200,
          align: 'center'
        },
        {
          title: "项目|接口",
          slot: "project|interface",
          width: 230,
          align: 'center'
        },
        {
          title: "请求URL",
          key: "url",
          width: 300,
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
          width: 250,
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
          width: 220,
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
          title: "测试结果",
          key: "status",
          align: "center",
          width: 94,
        },
      ],
    }
  },
  created() {
    this.getcaselist();

  },

  methods: {
    getcaselist() {
      let version = {'version':this.$route.params.id}
      reports(version).then(res => {
        this.data = res.data.data.results
        this.testcase_count = res.data.data.testcase_count
        this.success = res.data.data.success
        this.fail = res.data.data.fail
        this.success_rate = res.data.data.success_rate
        this.run_time = res.data.data.run_time
        this.execute_time = res.data.data.results[0].execute_time
        this.showEchats()
      })
    },

    showEchats() {
      const myChart = echarts.init(document.getElementById('main'));
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '测试报告',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: this.success, name: '成功'},
              {value: this.fail, name: '失败'},
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>