<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>用例查询</p>
      </div>
      <div class="pageHead flexC">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80">
          <FormItem label="所属项目" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="所属场景" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="请求接口" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="用例名称" prop="name">
            <Input
                type="text"
                v-model="searchForm.name"
                placeholder="请输入接口名称"
                clearable
                style="width: 200px"
            />
          </FormItem>

          <FormItem label="用例状态" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="重要级别" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search" style="
             margin-right: 10px;"
            >搜索
            </Button>
            <Button @click="handleReset('searchForm')">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <div class="pageHead flexC" style="padding-left: 0px;">
      <div class="pageHead flexC">

        <div style="display: flex;justify-content: space-between">
          <p>接口列表</p>
          <Button type="primary" @click="testcasecilp = !testcasecilp">{{ testcasecilp ? '收起用例夹' : '展开用例夹' }}</Button>
<!--          <Drawer title="创建接口" placement="left" v-model="testcasecilp" draggable :mask-closable="false" :mask=false>-->
<!--            <div>-->
<!--              <Select v-model="creapi.stenvs" clearable style="width:200px;" prefix="logo-freebsd-devil"-->
<!--                      @on-change="apiprnames(creapi.stenvs)">-->
<!--                <Option v-for="item in setapilist" :value="item.id" :key="item.name">{{ item.name }}</Option>-->
<!--              </Select>-->
<!--              <div style="border-bottom: 1px solid #e8eaec;margin:18px 0">-->
<!--              </div>-->
<!--            </div>-->

<!--            <Tree empty-text="请先选择项目" :data="Treedata" :render="renderTree" class="demo-tree-render"></Tree>-->

<!--            &lt;!&ndash;              创建接口&ndash;&gt;-->
<!--            <Modal v-model="cremodel" fullscreen title="创建接口">-->
<!--              <Tabs value="name1">-->
<!--                <TabPane label="基础信息" name="name1">-->
<!--                  <Form ref="InsterModal" :model="InsterModal" :rules="ruleValiinter">-->
<!--                    <div>-->
<!--                      <FormItem label="接口名称" prop="name" style="margin-left: 20px;">-->
<!--                        <Input-->
<!--                            type="text"-->
<!--                            v-model="InsterModal.name"-->
<!--                            clearable-->
<!--                            style="width: 1750px;"-->
<!--                        />-->
<!--                      </FormItem>-->
<!--                    </div>-->

<!--                    <div>-->
<!--                      <FormItem label="运行环境" prop="envs" style="margin-left: 30px;">-->
<!--                        <Select v-model="InsterModal.envs" style="width:1750px">-->
<!--                          <Option v-for="(item, key) in envsnames" :value="item.id" :key="key">{{ item.name }}-->
<!--                          </Option>-->
<!--                        </Select>-->
<!--                      </FormItem>-->
<!--                    </div>-->

<!--                    <div style="overflow: hidden">-->
<!--                      <FormItem label="所属项目" prop="project" style="float:left;margin-left: 20px;">-->
<!--                      </FormItem>-->
<!--                      <Select v-model="InsterModal.project" style="width:825px;float:left">-->
<!--                        <Option v-for="(item, key) in prjectname" :value="item.id" :key="key">{{ item.name }}-->
<!--                        </Option>-->
<!--                      </Select>-->

<!--                      <FormItem label="所属模块" prop="module" style="float:left;margin-left: 20px;">-->
<!--                      </FormItem>-->
<!--                      <Select v-model="InsterModal.module" style="width:825px;">-->
<!--                        <Option v-for="(item, key) in modulename" :value="item.id" :key="key">{{ item.name }}-->
<!--                        </Option>-->
<!--                      </Select>-->
<!--                    </div>-->


<!--                    <FormItem label="请求URL" prop="url" style="margin-left: 20px">-->
<!--                      <Input style="width: 1750px" v-model="InsterModal.url">-->

<!--                        <Select v-model="InsterModal.method" slot="prepend" style="width: 80px">-->
<!--                          <Option value="POST">Post</Option>-->
<!--                          <Option value="GET">Get</Option>-->
<!--                        </Select>-->

<!--                      </Input>-->
<!--                    </FormItem>-->


<!--                    <FormItem label="备注" style="margin-left: 58px;">-->
<!--                      <Input-->
<!--                          type="textarea"-->
<!--                          v-model="InsterModal.desc"-->
<!--                          :rows=10-->
<!--                          style="width: 1750px"-->
<!--                      />-->
<!--                    </FormItem>-->
<!--                  </Form>-->


<!--                </TabPane>-->
<!--                <TabPane label="Headers参数" name="name2">-->
<!--                  <template>-->
<!--                    <vue-json-editor-->
<!--                        style="height: 740px"-->
<!--                        v-model="headersmodle"-->
<!--                        :showBtns="false"-->
<!--                        :mode="'code'"-->
<!--                        lang="zh"-->
<!--                    />-->
<!--                  </template>-->
<!--                </TabPane>-->

<!--                <TabPane label="Body参数" name="name3">-->
<!--                  <template>-->
<!--                    <label style="padding-right: 20px;">参数类型</label>-->
<!--                    <RadioGroup v-model="method">-->
<!--                      <Radio label="Json"></Radio>-->
<!--                      <Radio label="Data"></Radio>-->
<!--                    </RadioGroup>-->

<!--                    <vue-json-editor-->
<!--                        style="height: 700px;margin-top: 20px;"-->
<!--                        v-model="bodymodle"-->
<!--                        :showBtns="false"-->
<!--                        :mode="'code'"-->
<!--                        lang="zh"-->
<!--                    />-->
<!--                  </template>-->
<!--                </TabPane>-->
<!--                <TabPane label="用例期望结果" name="name4">-->
<!--                  <template>-->
<!--                    <vue-json-editor-->
<!--                        style="height: 740px"-->
<!--                        v-model="exmodle"-->
<!--                        :showBtns="false"-->
<!--                        :mode="'code'"-->
<!--                        lang="zh"-->
<!--                    />-->
<!--                  </template>-->
<!--                </TabPane>-->
<!--              </Tabs>-->
<!--              <div slot="footer">-->
<!--                <Button @click="cremodel = false">取消</Button>-->
<!--                <Button @click="creatinter('InsterModal')" type="primary">确定</Button>-->
<!--              </div>-->
<!--            </Modal>-->

<!--&lt;!&ndash;              编辑接口&ndash;&gt;-->
<!--            <Modal v-model="cremodel2" fullscreen title="编辑接口">-->
<!--              <Tabs value="name1">-->
<!--                <TabPane label="基础信息" name="name1">-->
<!--                  <Form ref="InsterModal2" :model="InsterModal2" :rules="ruleValiinter2">-->
<!--                    <div>-->
<!--                      <FormItem label="接口名称" prop="name" style="margin-left: 20px;">-->
<!--                        <Input-->
<!--                            type="text"-->
<!--                            v-model="InsterModal2.name"-->
<!--                            clearable-->
<!--                            style="width: 1750px;"-->
<!--                        />-->
<!--                      </FormItem>-->
<!--                    </div>-->

<!--                    <div>-->
<!--                      <FormItem label="运行环境" prop="envs" style="margin-left: 30px;">-->
<!--                        <Select v-model="InsterModal2.envs" style="width:1750px">-->
<!--                          <Option v-for="(item, key) in envsnames" :value="item.id" :key="key">{{ item.name }}-->
<!--                          </Option>-->
<!--                        </Select>-->
<!--                      </FormItem>-->
<!--                    </div>-->

<!--                    <div style="overflow: hidden">-->
<!--                      <FormItem label="所属项目" prop="project" style="float:left;margin-left: 20px;">-->
<!--                      </FormItem>-->
<!--                      <Select v-model="InsterModal2.project" style="width:825px;float:left">-->
<!--                        <Option v-for="(item, key) in prjectname" :value="item.id" :key="key">{{ item.name }}-->
<!--                        </Option>-->
<!--                      </Select>-->

<!--                      <FormItem label="所属模块" prop="module" style="float:left;margin-left: 20px;">-->
<!--                      </FormItem>-->
<!--                      <Select v-model="InsterModal2.module" style="width:825px;">-->
<!--                        <Option v-for="(item, key) in modulename" :value="item.id" :key="key">{{ item.name }}-->
<!--                        </Option>-->
<!--                      </Select>-->
<!--                    </div>-->


<!--                    <FormItem label="请求URL" prop="url" style="margin-left: 20px">-->
<!--                      <Input style="width: 1750px" v-model="InsterModal2.url">-->

<!--                        <Select v-model="InsterModal2.method" slot="prepend" style="width: 80px">-->
<!--                          <Option value="POST">Post</Option>-->
<!--                          <Option value="GET">Get</Option>-->
<!--                        </Select>-->

<!--                      </Input>-->
<!--                    </FormItem>-->


<!--                    <FormItem label="备注" style="margin-left: 58px;">-->
<!--                      <Input-->
<!--                          type="textarea"-->
<!--                          v-model="InsterModal2.desc"-->
<!--                          :rows=10-->
<!--                          style="width: 1750px"-->
<!--                      />-->
<!--                    </FormItem>-->
<!--                  </Form>-->


<!--                </TabPane>-->
<!--                <TabPane label="Headers参数" name="name2">-->
<!--                  <template>-->
<!--                    <vue-json-editor-->
<!--                        style="height: 740px"-->
<!--                        v-model="headersmodle2"-->
<!--                        :showBtns="false"-->
<!--                        :mode="'code'"-->
<!--                        lang="zh"-->
<!--                    />-->
<!--                  </template>-->
<!--                </TabPane>-->

<!--                <TabPane label="Body参数" name="name3">-->
<!--                  <template>-->
<!--                    <label style="padding-right: 20px;">参数类型</label>-->
<!--                    <RadioGroup v-model="method2">-->
<!--                      <Radio label="Json"></Radio>-->
<!--                      <Radio label="Data"></Radio>-->
<!--                    </RadioGroup>-->

<!--                    <vue-json-editor-->
<!--                        style="height: 700px;margin-top: 20px;"-->
<!--                        v-model="bodymodle2"-->
<!--                        :showBtns="false"-->
<!--                        :mode="'code'"-->
<!--                        lang="zh"-->
<!--                    />-->
<!--                  </template>-->
<!--                </TabPane>-->
<!--              </Tabs>-->
<!--              <div slot="footer">-->
<!--                <Button @click="cremodel2 = false">取消</Button>-->
<!--                <Button @click="creatinter2('InsterModal2')" type="primary">确定</Button>-->
<!--              </div>-->
<!--            </Modal>-->

<!--          </Drawer>-->
        </div>
        <div class="pageContent flexC">
          <Table
              border
              :columns="columns"
              :data="data"
              sortable="custom"
              ref="table"
          >
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { testcaselist } from '../../api/api'
export default {
name: "testcase",
  data() {
    return{
      searchForm:{},
      testcasecilp:false,
      data:[],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "用例名称",
          key: "name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "项目|接口",
          key: "url",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "请求URL",
          key: "url",
          align: "center",
          width: 230,
          minWidth: 120,
        },
        {
          title: "Headers参数",
          key: "headers",
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "Body参数类型",
          key: "request_data_type",
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "Body参数",
          key: "request_data",
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "期望结果",
          key: "expect_result",
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "重要级别",
          key: "tester",
          align: "center",
          sortType: "desc",
          width: 260,
        },
          {
          title: "状态",
          key: "tester",
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 190,
          fixed: "right",
          render: (h, params) => {
            let enableOrDisable = "";
            return h("div", [
              h(
                  "a",
                  {

                    on: {
                      click: () => {
                        this.edit('crenvs2', params.row);
                      },
                    },
                  },
                  "编辑"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h('Poptip', {
                style: {
                  color: '#ED4014'
                },
                props: {
                  confirm: true,
                  transfer: true,
                  placement: 'left-end',
                  title: '确定要删除吗！',
                  type: 'error',
                  size: 'small',
                },
                on: {
                  'on-ok': () => {
                    this.remove(params.row);
                  }
                }
              }, '删除'),

              enableOrDisable,
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                  "a",
                  {
                    style: {
                      color: '#2D8CF0'
                    },
                    on: {
                      click: () => {
                        this.enable(params.row);
                      },
                    },
                  },
                  "创建用例"
              )

            ])
                ;

          },
        },
      ],
    }
  },
  created() {
   this.getlist();
  },
  methods: {
    getlist() {
      testcaselist().then(res => {
        this.data = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>