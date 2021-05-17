<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>接口查询</p>
      </div>
      <div class="pageHead flexC">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80">
          <FormItem label="所属项目" prop="project">
            <Select v-model="searchForm.project" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="接口名称" prop="name">
            <Input
                type="text"
                v-model="searchForm.name"
                placeholder="请输入接口名称"
                clearable
                style="width: 200px"
            />
          </FormItem>

          <FormItem label="请求url" prop="url">
            <Input
                type="text"
                v-model="searchForm.url"
                placeholder="请输入url"
                clearable
                style="width: 200px"
            />
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
          <Button type="primary" size="small" @click="modal1 = !modal1">{{ modal1 ? '收起创建模块' : '展开创建模块' }}</Button>
          <Drawer title="创建接口" placement="left" v-model="modal1" draggable :mask-closable="false" :mask=false>
            <div>
              <Select v-model="creapi.stenvs" clearable style="width:200px;" prefix="logo-freebsd-devil"
                      @on-change="apiprnames(creapi.stenvs)">
                <Option v-for="item in setapilist" :value="item.id" :key="item.name">{{ item.name }}</Option>
              </Select>
              <div style="border-bottom: 1px solid #e8eaec;margin:18px 0">
              </div>
            </div>

            <Tree empty-text="请先选择项目" :data="Treedata" :render="renderTree" class="demo-tree-render"></Tree>

            <!--              创建接口-->
            <Modal v-model="cremodel" fullscreen title="创建接口">
              <Tabs value="name1">
                <TabPane label="基础信息" name="name1">
                  <Form ref="InsterModal" :model="InsterModal" :rules="ruleValiinter">
                    <div>
                      <FormItem label="接口名称" prop="name" style="margin-left: 20px;">
                        <Input
                            type="text"
                            v-model="InsterModal.name"
                            clearable
                            style="width: 1750px;"
                        />
                      </FormItem>
                    </div>

                    <div>
                      <FormItem label="运行环境" prop="envs" style="margin-left: 30px;">
                        <Select v-model="InsterModal.envs" style="width:1750px">
                          <Option v-for="(item, key) in envsnames" :value="item.id" :key="key">{{ item.name }}
                          </Option>
                        </Select>
                      </FormItem>
                    </div>

                    <div style="overflow: hidden">
                      <FormItem label="所属项目" prop="project" style="float:left;margin-left: 20px;">
                      </FormItem>
                      <Select v-model="InsterModal.project" style="width:825px;float:left">
                        <Option v-for="(item, key) in prjectname" :value="item.id" :key="key">{{ item.name }}
                        </Option>
                      </Select>

                      <FormItem label="所属模块" prop="module" style="float:left;margin-left: 20px;">
                      </FormItem>
                      <Select v-model="InsterModal.module" style="width:825px;">
                        <Option v-for="(item, key) in modulename" :value="item.id" :key="key">{{ item.name }}
                        </Option>
                      </Select>
                    </div>


                    <FormItem label="请求URL" prop="url" style="margin-left: 20px">
                      <Input style="width: 1750px" v-model="InsterModal.url">

                        <Select v-model="InsterModal.method" slot="prepend" style="width: 80px">
                          <Option value="POST">Post</Option>
                          <Option value="GET">Get</Option>
                        </Select>

                      </Input>
                    </FormItem>


                    <FormItem label="备注" style="margin-left: 58px;">
                      <Input
                          type="textarea"
                          v-model="InsterModal.desc"
                          :rows=10
                          style="width: 1750px"
                      />
                    </FormItem>
                  </Form>


                </TabPane>
                <TabPane label="Headers参数" name="name2">
                  <template>
                    <vue-json-editor
                        style="height: 740px"
                        v-model="headersmodle"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </template>
                </TabPane>

                <TabPane label="Body参数" name="name3">
                  <template>
                    <label style="padding-right: 20px;">参数类型</label>
                    <RadioGroup v-model="method">
                      <Radio label="Json"></Radio>
                      <Radio label="Data"></Radio>
                    </RadioGroup>

                    <vue-json-editor
                        style="height: 700px;margin-top: 20px;"
                        v-model="bodymodle"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </template>
                </TabPane>
                <TabPane label="用例期望结果" name="name4">
                  <template>
                    <vue-json-editor
                        style="height: 740px"
                        v-model="exmodle"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </template>
                </TabPane>
              </Tabs>
              <div slot="footer">
                <Button @click="cremodel = false">取消</Button>
                <Button @click="creatinter('InsterModal')" type="primary">确定</Button>
              </div>
            </Modal>

<!--              编辑接口-->
            <Modal v-model="cremodel2" fullscreen title="编辑接口">
              <Tabs value="name1">
                <TabPane label="基础信息" name="name1">
                  <Form ref="InsterModal2" :model="InsterModal2" :rules="ruleValiinter2">
                    <div>
                      <FormItem label="接口名称" prop="name" style="margin-left: 20px;">
                        <Input
                            type="text"
                            v-model="InsterModal2.name"
                            clearable
                            style="width: 1750px;"
                        />
                      </FormItem>
                    </div>

                    <div>
                      <FormItem label="运行环境" prop="envs" style="margin-left: 30px;">
                        <Select v-model="InsterModal2.envs" style="width:1750px">
                          <Option v-for="(item, key) in envsnames" :value="item.id" :key="key">{{ item.name }}
                          </Option>
                        </Select>
                      </FormItem>
                    </div>

                    <div style="overflow: hidden">
                      <FormItem label="所属项目" prop="project" style="float:left;margin-left: 20px;">
                      </FormItem>
                      <Select v-model="InsterModal2.project" style="width:825px;float:left">
                        <Option v-for="(item, key) in prjectname" :value="item.id" :key="key">{{ item.name }}
                        </Option>
                      </Select>

                      <FormItem label="所属模块" prop="module" style="float:left;margin-left: 20px;">
                      </FormItem>
                      <Select v-model="InsterModal2.module" style="width:825px;">
                        <Option v-for="(item, key) in modulename" :value="item.id" :key="key">{{ item.name }}
                        </Option>
                      </Select>
                    </div>


                    <FormItem label="请求URL" prop="url" style="margin-left: 20px">
                      <Input style="width: 1750px" v-model="InsterModal2.url">

                        <Select v-model="InsterModal2.method" slot="prepend" style="width: 80px">
                          <Option value="POST">Post</Option>
                          <Option value="GET">Get</Option>
                        </Select>

                      </Input>
                    </FormItem>


                    <FormItem label="备注" style="margin-left: 58px;">
                      <Input
                          type="textarea"
                          v-model="InsterModal2.desc"
                          :rows=10
                          style="width: 1750px"
                      />
                    </FormItem>
                  </Form>


                </TabPane>
                <TabPane label="Headers参数" name="name2">
                  <template>
                    <vue-json-editor
                        style="height: 740px"
                        v-model="headersmodle2"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </template>
                </TabPane>

                <TabPane label="Body参数" name="name3">
                  <template>
                    <label style="padding-right: 20px;">参数类型</label>
                    <RadioGroup v-model="method2">
                      <Radio label="Json"></Radio>
                      <Radio label="Data"></Radio>
                    </RadioGroup>

                    <vue-json-editor
                        style="height: 700px;margin-top: 20px;"
                        v-model="bodymodle2"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </template>
                </TabPane>
              </Tabs>
              <div slot="footer">
                <Button @click="cremodel2 = false">取消</Button>
                <Button @click="creatinter2('InsterModal2')" type="primary">确定</Button>
              </div>
            </Modal>

          </Drawer>
        </div>

      </div>

      <div class="pageContent">
          <Table
              border
              :columns="columns"
              :data="data"
              sortable="custom"
              ref="table"
              size="small"
          >
            <template slot-scope="{ row }" slot="prject|api">
              <strong>{{ row.project.name }} - {{ row.module.name }}</strong>
            </template>
          </Table>
          <div>
          <Page
                  :total="page.total"
                  :page-size= "page.size"
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
</template>

<script>
import {
  pronames,
  projectr,
  apilist,
  projectlist,
  interfacede,
  projectcr,
  projectup,
  findmodule,
  envlist,
  modulelist,
  crinter,
  upinter,
  interreads
} from '../../api/api'
import MarkPoptip from '../../views/apithttp/poptip';
import vueJsonEditor from 'vue-json-editor'


export default {
  name: "project_list",
  components: {vueJsonEditor},
  modal_loading: false,
  data() {
    return {
      page:{
        index:1,
        size:10,
        total:50
      },
      interfase_id:'',
      method: "Json",
      method2: "Json",
      InsterModal: {
        name: '',
        project: '',
        envs: '',
        module: '',
        url: '',
        method: 'POST',
        desc: ''
      },
      InsterModal2: {
        name: '',
        project: '',
        envs: '',
        module: '',
        url: '',
        method: 'POST',
        desc: ''
      },
      headersmodle: {
        "Content-Type": "application/json"
      },
      headersmodle2: {
        "Content-Type": "application/json"
      },
      bodymodle: {},
      bodymodle2: {},
      exmodle: {
        "output": [],
        "validate": [
          {
            "check": "status_code",
            "expect": 200,
            "comparator": "eq"
          }
        ]
      },
      prjectname: [],
      modulename: [],
      envsnames: [],
      cremodel: false,
      cremodel2: false,
      Treedata: [],
      setapilist: [],
      creapi: {
        stenvs: ''
      },
      projectnames: [],
      pnames: '', //搜索已选的项目名
      project_id: '',
      crenvs: {
        name: '',
        publishapp: '',
        tester: '',
        desc: ''
      },
      crenvs2: {
        name: '',
        publishapp: '',
        tester: '',
        desc: ''
      },
      modal1: false,
      modal2: false,
      data: [],
      enterTitle: '',
      searchForm: {
        project:'',
        name: '',
        url:''
      },
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "接口名称",
          key: "name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "请求url",
          key: "url",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "请求方法",
          key: "method",
          align: "center",
          width: 230,
          minWidth: 120,
        },
        {
          title: "Headers参数示例",
          key: "headers",
          align: "center",
          width: 260,
        },
        {
          title: "Body参数类型",
          key: "request_data_type",
          align: "center",
          width: 260,
        },
        {
          title: "Body参数示例",
          key: "request_data",
          align: "center",
          width: 260,
        },
        {
          title: "项目|模块",
          slot: "prject|api",
          align: "center",
          width: 260,
        },
        {
          title: "测试人员",
          key: "tester",
          align: "center",
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
      ruleValidate: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        publishapp: [
          {required: true, message: '请输入应用名称', trigger: 'blur'},
        ],
        tester: [
          {required: true, message: '请填写测试人员信息', trigger: 'blur'},
        ],
      },
      ruleValidate2: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        publishapp: [
          {required: true, message: '请输入应用名称', trigger: 'blur'},
        ],
        tester: [
          {required: true, message: '请填写测试人员信息', trigger: 'blur'},
        ],
      },
      ruleValiinter: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        project: [
          {required: true, message: '请选择所属项目', trigger: 'blur', type: 'number'},
        ],
        module: [
          {required: true, message: '请选择所属模块', trigger: 'blur', type: 'number'},
        ],
        url: [
          {required: true, message: '请输入请求地址', trigger: 'blur'},
        ],
      },
      ruleValiinter2: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        project: [
          {required: true, message: '请选择所属项目', trigger: 'blur', type: 'number'},
        ],
        module: [
          {required: true, message: '请选择所属模块', trigger: 'blur', type: 'number'},
        ],
        url: [
          {required: true, message: '请输入请求地址', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    this.projectname();
    this.getlist();
    this.getpolist();
    this.envlist();
    this.modulelist();
  },
  mounted() {
  },
  computed: {},
  methods: {
    renderTree(h, {root, node, data}) {
      return h('span', {
            class: ['ivu-tree-title'], style: {
              display: 'inline-block',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            },
          },
          [
            h('span', {class: 'ivu-tree-title'}, data.title),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'md-add',
              }),
              style: {
                border: 'none',
                color: '#2D8CF0',
                backgroundColor: 'transparent',
                width: '25px',
                height: '25px',
                float: 'right',
              },
              on: {
                click: () => {
                  this.crinter(data)
                }
              }
            }),
          ]);
    },

    envlist() {
      envlist().then(res => {
        this.envsnames = res.data.data
      })
    },

    modulelist() {
      modulelist().then(res => {
        const data = res.data.data
        this.modulename = data
      })
    },

    getpolist() {
      projectlist().then(res => {
        this.setapilist = res.data.data
        this.prjectname = res.data.data
      })
    },

    projectname() {
      pronames().then(res => {
        this.projectnames = res.data.data
      })
    },

    getlist() {
      let data = {
        'size':this.page.size,
        'page':this.page.index
      }
      apilist(data).then(res => {
        const data = res.data.data
        this.data = data
        this.page.total = res.count
      })
    },
    changeSize(e) {
      let data = {
        'size':this.page.size,
        'page':e
      }
      envlist(data).then(res =>{
        let data = res.data.data
        this.data = data
        this.page.total = res.count

      })
    },
    changePage(e){
      let data = {
        'size':e,
        'page':this.page.index
      }
      envlist(data).then(res => {
        let data = res.data.data
        this.data = data
        this.page.total = res.count
      })
    },

    handleSearch() {
      apilist(this.searchForm).then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    handleReset(name) {
      this.getlist()
      this.$refs[name].resetFields();
    },

    remove(v) {
      interfacede(v.id).then(res => {
        this.$Message.success("删除成功！");
        this.getlist()
      })
    },

    cancel() {
      this.modal1 = false
    },

    cancel2() {
      this.modal2 = false
    },


    edit(name, v) {
      this.interfase_id = v.id
      this.cremodel2 = true
      this.InsterModal2.name = v.name
      this.InsterModal2.envs = v.envs
      this.InsterModal2.project = v.project.id
      this.InsterModal2.module = v.module.id
      this.InsterModal2.url = v.url
      this.InsterModal2.method = v.method
      this.InsterModal2.desc = v.desc
      this.headersmodle2 = JSON.parse(v.headers)
      this.bodymodle2 = JSON.parse(v.request_data)
      this.method2 = v.request_data_type
    },


    enable() {
      // this.$router.push('')
    },

    apiprnames() {
      if (this.creapi.stenvs) {
        findmodule(this.creapi.stenvs).then(res => {
          let data = res.data.data
          data = data.map((item) => {
            return {
              id: item.id,
              title: item.name,
              parent: item.parent,
              project: item.project,
              floor: item.floor,
              desc: item.desc,
              expand: true,
              selected: true,
            }
          })
          let arrayToTree = require("array-to-tree");
          this.Treedata = arrayToTree(data, {
            parentProperty: "parent",
            childrenProperty: "children",
            customID: "id",
          });
        })
      } else {
        this.Treedata = []
      }
    },

    crinter(data) {
      this.cremodel = true
      this.InsterModal.project = data.project
      this.InsterModal.module = data.id

    },

    creatinter(name) {
      let datas = {
        "name": this.InsterModal.name,
        "envs": this.InsterModal.envs,
        "project": this.InsterModal.project,
        "module": this.InsterModal.module,
        "url": this.InsterModal.url,
        "method": this.InsterModal.method,
        "desc": this.InsterModal.desc,
        "tester": "测试人员",
        "headers": JSON.stringify(this.headersmodle),
        "request_data": JSON.stringify(this.bodymodle),
        "request_data_type": this.method,
        "expect_result": this.exmodle
      }
      this.$refs[name].validate((valid) => {
        if (valid) {

          crinter(datas).then(res => {
            this.cremodel = false
            this.$Message.success('创建接口成功！')
            this.$refs[name].resetFields();
            this.getlist();
          })
        }
      })
    },

    creatinter2(name) {
      let datas = {
        "name": this.InsterModal2.name,
        "envs": this.InsterModal2.envs,
        "project": this.InsterModal2.project,
        "module": this.InsterModal2.module,
        "url": this.InsterModal2.url,
        "method": this.InsterModal2.method,
        "desc": this.InsterModal2.desc,
        "tester": "测试人员",
        "headers": JSON.stringify(this.headersmodle2),
        "request_data": JSON.stringify(this.bodymodle2),
        "request_data_type": this.method2,
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          upinter(this.interfase_id,datas).then(res => {
            this.cremodel2 = false
            this.$Message.success('修改接口成功！')
            this.$refs[name].resetFields();
            this.getlist();
          })
        }
      })
    }
  },
  watch: {},
  filters: {}
}
</script>

<style lang="less">
.jsoneditor-vue {
  height: 100%;
}

.user_list-page {
  .pageContent {
    & > ul {
      & > li {
        border-bottom: 1px solid #e8eaec;
        padding: 12px 0;

        & > div:first-child {
          margin-bottom: 16px;

          & > span:first-child {
            margin-right: 16px;
          }

          & > span:last-child {
            color: rgba(0, 0, 0, .85);
            font-size: 16px;
          }
        }

        & > div:nth-child(3) {
          margin-top: 8px;

          & > span:nth-child(1) {
            margin: 2px 4px 2px 0;
            padding: 0 8px;
            border: 1px solid #e8eaec;
            border-radius: 3px
          }

          /*已验证邮箱*/

          .isCheck {
            background: #f6ffed;
            border-color: #b7eb8f !important;
            color: #52c41a !important;
          }

          .noCheck {
            background: #fff1f0;
            border-color: #ffa39e !important;
            color: #f5222d !important;
          }

          & > p {
            span {
              margin: 2px 4px 2px 0;
              padding: 0 8px;
              border: 1px solid #e8eaec;
              border-radius: 3px
            }

            .ordinary {
              background: #e6f7ff;
              border-color: #91d5ff !important;
              color: #1890ff !important;
            }

            .admin {
              background: #f9f0ff;
              border-color: #d3adf7 !important;
              color: #722ed1 !important;
            }

            .super {
              background: #fff2e8;
              border-color: #ffbb96 !important;
              color: #fa541c !important;
            }

            .test {
              background: #ffdff5;
              border-color: #fcc3f5 !important;
              color: #c449b8 !important;
            }
          }

          button {
            margin-left: 16px;
          }
        }

        & > div:nth-child(4) {
          margin-top: 8px;

          button {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
