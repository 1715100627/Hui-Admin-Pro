<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>用例结果详情</p>
      </div>
      <div class="pageHead" style="display:flex;flex-wrap: wrap;padding-bottom: 16px;">
        <div style="display:flex;width: 380px;padding-bottom: 30px">
          <table style="margin-right: 10px;padding-top: 3px">场景名称</table>
          <Input v-model="test_model.testsuite_name" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-bottom: 30px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">所属项目</table>
          <Input v-model="test_model.project_name" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">版本序号</table>
          <Input v-model="test_model.version" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">执行时间</table>
          <Input v-model="test_model.execute_time" style="width: 300px"></Input>
        </div>


        <div style="display:flex;width: 380px;">
          <table style="margin-right: 10px;padding-top: 3px">用例总数</table>
          <Input v-model="test_model.total_num" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;">
          <table style="margin-right: 10px;padding-top: 3px;margin-bottom: 30px;">成功数量</table>
          <Input v-model="test_model.passed_num" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">失败数量</table>
          <Input v-model="test_model.failed_num" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">执行耗时(ms)</table>
          <Input v-model="test_model.elapsed_ms" style="width: 270px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">测试结果</table>
          <Input v-model="test_model.status" style="width: 270px"></Input>
        </div>

      </div>

      <div class="pageHead" style="padding-left: 0px;">
        <div class="pageContent">
          <div class="pageHead">
            <Table
                border
                :columns="testsuitecolumns"
                :data="listdata"
                sortable="custom"
                ref="table"
                size="small"
            >
              <!--                <template slot-scope="{ row }" slot="project|testsuite">-->
              <!--                  <strong>{{ row.project_name }} - {{ row.testsuite_name }}</strong>-->
              <!--                </template>-->

              <!--                <template slot-scope="{ row }" slot="icon">-->
              <!--                  <Icon v-if="row.failed_num <= 0" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/> &lt;!&ndash;全部通过&ndash;&gt;-->
              <!--                  <Icon v-else-if="row.passed_num < 1" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/> &lt;!&ndash;全部失败&ndash;&gt;-->
              <!--                  <Icon v-else type="ios-leaf" size="24" color="rgb(255, 153, 0)"/> &lt;!&ndash;部分通过&ndash;&gt;-->
              <!--                </template>-->
            </Table>
            <!--              <div>-->
            <!--                <Page-->
            <!--                    :total="page.total"-->
            <!--                    :page-size="page.size"-->
            <!--                    :current="page.index"-->
            <!--                    show-total-->
            <!--                    show-elevator-->
            <!--                    show-sizer-->
            <!--                    @on-change="changeSize"-->
            <!--                    @on-page-size-change="changePage"-->
            <!--                    style="margin-top: 20px;"-->
            <!--                />-->
            <!--              </div>-->
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
import {testsuite_reportsId} from '../../api/api'

export default {
  name: "testsuite_reports_details",
  components: {vueJsonEditor},
  data() {
    return {
      listdata: [],
      testsuitecolumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "用例名称",
          key: "total_num",
          minWidth: 200,
          align: 'center'
        },
        {
          title: "项目|接口",
          slot: "project|testsuite",
          minWidth: 125,
          width: 300,
          align: 'center'
        },

        {
          title: "请求URL",
          key: "passed_num",
          width: 200,
          minWidth: 200,
        },
        {
          title: "执行时间",
          key: "failed_num",
          width: 120,
          align: 'center'
        },
        {
          title: "响应状态码",
          key: "elapsed_ms",
          align: "center",
          width: 120,
        },
        {
          title: "响应时长(ms)",
          key: "execute_time",
          align: "center",
          width: 150,
        },
        {
          title: "响应结果",
          key: "version",
          align: "center",
          width: 130,
        },
        {
          title: "失败原因",
          slot: 'icon',
          align: "center",
          fixed: "right",
          width: 85,
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
      exmodle2: false,
      test_model: {
        testsuite_name: '',
        project_name: '',
        execute_time: '',
        elapsed_ms: '',
        total_num: '',
        passed_num: '',
        failed_num: '',
        status: '',
        version: ''
      }
    }
  },

  created() {
    // console.log(this.$route.params.id)
    this.get_reports();
  },

  methods: {
    get_reports() {
      let id = this.$route.params.id
      testsuite_reportsId(id).then(res => {
        let data = res.data.data
        console.log(data)
        this.test_model.testsuite_name = data.testsuite_name
        this.test_model.project_name = data.project_name
        this.test_model.execute_time = data.execute_time
        this.test_model.elapsed_ms = data.elapsed_ms
        this.test_model.total_num = data.total_num
        this.test_model.passed_num = data.passed_num
        this.test_model.failed_num = data.failed_num
        this.test_model.status = data.status
        this.test_model.version = data.version
      })
    },
  },
}
</script>

<style scoped>

</style>