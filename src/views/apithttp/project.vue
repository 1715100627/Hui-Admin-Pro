<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>项目查询</p>
      </div>
      <div class="pageHead flexC">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80">
          <FormItem label="项目名称" prop="name">
            <Input
                type="text"
                v-model="searchForm.title"
                placeholder="请输入项目名称"
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
          <p>项目列表</p>
          <Button type="primary" @click="modal1 = true">创建项目</Button>
          <!--        创建项目-->
          <Modal
              width="950"
              v-model="modal1"
              title="创建项目">
            <Form ref="crenvs" :model="crenvs" :rules="ruleValidate">
              <div>
                <FormItem label="项目名称" prop="name">
                  <Input
                      type="text"
                      v-model="crenvs.name"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>
              <div>
                <FormItem label="应用名称" prop="publishapp">
                  <Input
                      type="text"
                      v-model="crenvs.publishapp"
                      placeholder=""
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem label="测试人员" prop="tester">
                  <Input
                      type="text"
                      v-model="crenvs.tester"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>


              <div>
                <FormItem label="备注" style="margin-left: 38px;">
                  <Input
                      type="textarea"
                      v-model="crenvs.desc"
                      rows="5"
                      style="width: 800px"
                  />
                </FormItem>
              </div>
            </Form>
            <div slot="footer">
              <Button @click="cancel">取消</Button>
              <Button @click="sure('crenvs')" type="primary">确定</Button>
            </div>
          </Modal>
        </div>


        <!--        编辑项目-->
        <div style="display: flex;justify-content: space-between">
          <Modal
              width="950"
              v-model="modal2"
              title="编辑项目">
            <Form ref="crenvs2" :model="crenvs2" :rules="ruleValidate2">
              <div>
                <FormItem label="项目名称" prop="name">
                  <Input
                      type="text"
                      v-model="crenvs2.name"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>
              <div>
                <FormItem label="应用名称" prop="publishapp">
                  <Input
                      type="text"
                      v-model="crenvs2.publishapp"
                      placeholder=""
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem label="测试人员" prop="tester">
                  <Input
                      type="text"
                      v-model="crenvs2.tester"
                      placeholder=""
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem label="备注" style="margin-left: 38px;">
                  <Input
                      type="textarea"
                      v-model="crenvs2.desc"
                      rows="5"
                      style="width: 800px"
                  />
                </FormItem>
              </div>
            </Form>
            <div slot="footer">
              <Button @click="cancel2">取消</Button>
              <Button @click="sure2('crenvs2')" type="primary">确定</Button>
            </div>
          </Modal>
        </div>

      </div>
      <div class="pageContent flexC">
        <Table
            border
            :columns="columns"
            :data="data"
            sortable="custom"
            ref="table"
        ></Table>
      </div>
    </div>
  </div>
</template>

<script>
import {projectlist, projectr, envupdate, projectde, projectcr, projectup} from '../../api/api'
import MarkPoptip from '../../views/apithttp/poptip';


export default {
  name: "project_list",
  modal_loading: false,
  data() {
    return {
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
          title: "项目名称",
          key: "name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "应用名称",
          key: "publish_app",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "测试人员",
          key: "tester",
          align: "center",
          width: 230,
          minWidth: 120,
        },
        {
          title: "创建时间",
          key: "create_time",
          sortable: true,
          align: "center",
          sortType: "desc",
          width: 260,
        },
        {
          title: "备注信息",
          key: "desc",
          align: "center",
          sortType: "desc",
          render: (h, params) => {
            return h('div',params.row.desc || '-')
          }

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
    this.getlist();
  },
  mounted() {
  },
  computed: {},
  methods: {
    getlist() {
      projectlist().then(res => {
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
