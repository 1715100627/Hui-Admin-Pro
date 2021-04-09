<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>接口查询</p>
      </div>
      <div class="pageHead flexC">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80">
          <FormItem label="所属项目" prop="name">
            <Select v-model="pnames" style="width:200px" clearable>
              <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="接口名称" prop="name">
            <Input
                type="text"
                v-model="searchForm.title"
                placeholder="请输入接口名称"
                clearable
                style="width: 200px"
            />
          </FormItem>

          <FormItem label="请求url" prop="name">
            <Input
                type="text"
                v-model="searchForm.title"
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
            <Button @click="handleReset">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>


    <div class="pageHead flexC" style="padding-left: 0px;">
      <div class="pageHead flexC">

        <div style="display: flex;justify-content: space-between">
          <p>接口列表</p>
          <Button type="primary" @click="modal1 = !modal1">{{ modal1 ? '收起创建模块' : '展开创建模块' }}</Button>
            <Drawer title="创建接口" placement="left" v-model="modal1" draggable :mask-closable="false" :mask=false>
              <div>
                    <Select v-model="creapi.stenvs" clearable style="width:200px;" prefix="logo-freebsd-devil"
                            @on-change="moduproj(creapi.stenvs)">
                      <Option v-for="item in setapilist" :value="item.id" :key="item.name">{{ item.name }}</Option>
                    </Select>
                    <div style="border-bottom: 1px solid #e8eaec;margin:18px 0">
                    </div>
                  </div>
            </Drawer>
      </div>
      <div class="pageContent flexC">
        <Table
            border
            :columns="columns"
            :data="data"
            sortable="custom"
            ref="table"
        >
          <template slot-scope="{ row }" slot="prject|api">
            <strong>{{ row.project.name }} - {{ row.module.name }}</strong>
          </template>
        </Table>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {pronames, projectr,apilist, envupdate, projectde, projectcr, projectup} from '../../api/api'
import MarkPoptip from '../../views/apithttp/poptip';


export default {
  name: "project_list",
  modal_loading: false,
  data() {
    return {
      setapilist:[],
      creapi:{
        stenvs: ''
      },
      projectnames:[],
      pnames:'', //搜索已选的项目名
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
        title: ''
        // 搜索框初始化对象
        // pageNumber: 1, // 当前页数
        // pageSize: 10, // 页面大小
        // sort: "createTime", // 默认排序字段
        // order: "desc", // 默认排序方式
        // startDate: "", // 起始时间
        // endDate: "", // 终止时间
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
        title: "Body参数示例",
        key: "request_data",
        align: "center",
        sortType: "desc",
        width: 260,
        },
        {
        title: "项目|模块",
        slot: "prject|api",
        align: "center",
        sortType: "desc",
        width: 260,
        },
        {
        title: "测试人员",
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
                  "创建接口"
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
      }
    }
  },
  created() {
    this.projectname();
    this.getlist();
  },
  mounted() {
  },
  computed: {},
  methods: {
    projectname() {
      pronames().then(res => {
        this.projectnames = res.data.data
      })
    },

    getlist() {
      apilist().then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    handleSearch() {
      projectr(this.searchForm.title).then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    handleReset() {
      projectlist().then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    remove(v) {
      projectde(v.id).then(res => {
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

    sure(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const datas = {
            'name': this.crenvs.name,
            'publish_app': this.crenvs.publishapp,
            'tester': this.crenvs.tester,
            'desc': this.crenvs.desc
          }
          projectcr(datas).then(res => {
            this.getlist()
            this.modal1 = false
            this.$Message.success('创建项目成功!');
          })
        }
      })
    },

    edit(name, v) {
      this.modal2 = true
      this.project_id = v.id
      this.crenvs2.name = v.name
      this.crenvs2.publishapp = v.publish_app
      this.crenvs2.tester = v.tester
      this.crenvs2.desc = v.desc
    },
    sure2(name) {
      const datas = {
        'name': this.crenvs2.name,
        'publish_app': this.crenvs2.publishapp,
        'tester': this.crenvs2.tester,
        'desc': this.crenvs2.desc
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          projectup(this.project_id, datas).then(res => {
            this.getlist()
            this.modal2 = false
            this.$Message.success('修改项目成功!');
          })
        }
      })
    },

    enable() {
      // this.$router.push('')
    },
  },
  watch: {},
  filters: {}
}
</script>

<style lang="less">
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
