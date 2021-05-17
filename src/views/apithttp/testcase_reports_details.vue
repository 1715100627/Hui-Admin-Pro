<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>用例结果详情</p>
      </div>
      <div class="pageHead" style="display:flex;flex-wrap: wrap;padding-bottom: 16px;">
        <div style="display:flex;width: 380px;padding-bottom: 30px">
          <table style="margin-right: 10px;padding-top: 3px">用例名称</table>
          <Input v-model="test_model.testcase_name" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-bottom: 30px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">所属项目</table>
          <Input v-model="test_model.project" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">所属接口</table>
          <Input v-model="test_model.interface" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 380px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">所属场景</table>
          <Input v-model="test_model.testsuits" style="width: 300px"></Input>
        </div>

        <div style="display:flex;width: 1000px;">
          <table style="margin-right: 10px;padding-top: 3px;padding-bottom: 30px">请求URL</table>
          <Input v-model="test_model.base_url" style="width: 850px"></Input>
        </div>

        <div style="display:flex;width: 530px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">请求方法</table>
          <Input v-model="test_model.method" style="width: 440px"></Input>
        </div>

        <div style="display:flex;width: 470px;">
          <table style="margin-right: 10px;padding-top: 3px;margin-bottom: 30px;">版本</table>
          <Input v-model="test_model.edition" style="width: 380px"></Input>
        </div>

        <div style="display:flex;width: 580px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">执行时间</table>
          <Input v-model="test_model.time" style="width: 480px"></Input>
        </div>

        <div style="display:flex;width: 480px;padding-left: 10px">
          <table style="margin-right: 10px;padding-top: 3px">测试结果</table>
          <Input v-model="test_model.result" style="width: 390px"></Input>
        </div>

      </div>

      <div class="pageHead" style="padding-left: 0px;">
      <div class="pageContent">
        <Tabs value="name1">
        <Tab-pane label="Headers参数" name="name1">
        <template>
          <vue-json-editor
              style="height: 740px;"
              v-model="test_model.headers"
              :showBtns="false"
              :mode="'code'"
              lang="zh"
          />
        </template>
        </Tab-pane>
        <Tab-pane label="Body参数（Json)" name="name2">
           <template>
          <vue-json-editor
              style="height: 740px"
              v-model="test_model.body"
              :showBtns="false"
              :mode="'code'"
              lang="zh"
          />
        </template>
        </Tab-pane>
        <Tab-pane label="响应结果" name="name3" style="display:flex">
          <div style="width:750px;margin-right: 44px;">
            <span>响应结果</span>
            <vue-json-editor
                style="height: 740px;width: 750px;"
                v-model="test_model.response"
                :showBtns="false"
                :mode="'code'"
                lang="zh"
            />
          </div>

          <div style="width:750px;">
            <span>失败原因</span>
            <vue-json-editor
                style="height: 740px;width: 750px;"
                v-model="test_model.failure_reason"
                :showBtns="false"
                :mode="'code'"
                lang="zh"
            />
          </div>
        </Tab-pane>
    </Tabs>

      </div>

    </div>
    </div>

  </div>
</template>

<script>
import { get_test_reports } from '../../api/api'
import vueJsonEditor from "vue-json-editor";

export default {
  name: "testcase_reports_details",
  components: {vueJsonEditor},
  data() {
    return {
      exmodle2:false,
      test_model: {
        testcase_name:'',
        project:'',
        interface:'',
        testsuits:'',
        base_url:'',
        method:'',
        edition:'',
        time:'',
        result:'',
        headers:'',
        body:'',
        response:'',
        failure_reason:''
      }
    }
  },
  created() {
    console.log(this.$route.params)
    this.get_reports();
  },

  methods: {
    get_reports() {
      let id = this.$route.params.id
      get_test_reports(id).then(res => {
        console.log(res)
        let data = res.data
        this.test_model.testcase_name = data.testcase_name
        this.test_model.project = data.project_name
        this.test_model.interface = data.api_name
        this.test_model.base_url = data.url
        this.test_model.method = data.method
        this.test_model.edition = data.version
        this.test_model.time = data.execute_time
        this.test_model.result = data.status
        this.test_model.headers = data.headers
        this.test_model.body = data.request_data
        this.test_model.response = data.actual_response_data
        this.test_model.failure_reason = data.failure_reason
      })
    },
  },
}
</script>

<style lang="less">
.jsoneditor-vue {
  height: 100%;
}
</style>