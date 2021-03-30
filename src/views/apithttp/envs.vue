<template>
  <div class="user_list-page flexC">
    <div class="user_list-page flexC" style="margin-bottom: 20px;">
      <div class="pageHead flexC">
        <p>环境查询</p>
      </div>
      <div class="pageHead flexC">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80">
          <FormItem label="环境名称" prop="name">
            <Input
                type="text"
                v-model="searchForm.title"
                placeholder="请输入环境名称"
                clearable
                style="width: 200px"
            />
          </FormItem>
          <FormItem label="环境状态" prop="is_active">
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


    <div class="pageHead flexC" style="padding-left: 0px;">
      <div class="pageHead flexC">
<!--        创建环境-->
        <div style="display: flex;justify-content: space-between">
          <p>环境列表</p>
          <Button type="primary" @click="modal1 = true">创建环境</Button>

          <Modal
              width="950"
              v-model="modal1"
              title="创建环境">
            <Form ref="crenvs" :model="crenvs" :rules="ruleValidate">
              <div>
                <FormItem label="环境名称" prop="name">
                  <Input
                      type="text"
                      v-model="crenvs.name"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>
              <div>
                <FormItem label="环境地址" prop="url">
                  <Input
                      type="text"
                      v-model="crenvs.url"
                      placeholder="格式：域名(或IP):端口号"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem label="是否启用" prop="isactive">
                <RadioGroup v-model="crenvs.isactive" type="button" button-style="default" size="small">
                    <Radio :label="true" type="true">启用</Radio>
                    <Radio :label="false" type="false" >禁用</Radio>
                </RadioGroup>
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


<!--        编辑环境-->
        <div style="display: flex;justify-content: space-between">
          <Modal
              width="950"
              v-model="modal2"
              title="编辑环境">
            <Form ref="crenvs2" :model="crenvs2" :rules="ruleValidate2">
              <div>
                <FormItem label="环境名称" prop="name">
                  <Input
                      type="text"
                      v-model="crenvs2.name"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>
              <div>
                <FormItem label="环境地址" prop="url">
                  <Input
                      type="text"
                      v-model="crenvs2.url"
                      placeholder="格式：域名(或IP):端口号"
                      clearable
                      style="width: 800px"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem label="是否启用" prop="isactive">
                <RadioGroup v-model="crenvs2.isactive" type="button" button-style="default" size="small">
                    <Radio :label="true" type="true">启用</Radio>
                    <Radio :label="false" type="false" >禁用</Radio>
                </RadioGroup>
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
import {envlist, envreads, envupdate, envdelete, envcreate, envsupdate } from '../../api/api'
import MarkPoptip from '../../views/apithttp/poptip';


export default {
  name: "envs_list",
  modal_loading:false,
  data() {
    return {
      envsid: '',
      crenvs:{
        name:'',
        url:'',
        isactive:true,
        desc:''
      },
      crenvs2:{
        name:'',
        url:'',
        isactive:true,
        desc:''
      },
      modal1: false,
      modal2:false,
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
          title: "环境名称",
          key: "name",
          minWidth: 125,
          width: 300,
          sortable: true,
        },
        {
          title: "环境地址",
          key: "base_url",
          minWidth: 125,
          sortable: true,
        },
        {
          title: "最近维护人",
          key: "departmentTitle",
          width: 150,
          minWidth: 120,
        },
        {
          title: "创建时间",
          key: "create_time",
          sortable: true,
          sortType: "desc",
          width: 180,
        },
        {
          title: "状态",
          key: "is_active",
          align: "center",
          fixed: "right",
          width: 100,
          render: (h, params) => {
            if (params.row.is_active == true) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "success",
                    text: "启用",
                  },
                }),
              ]);
            } else if (params.row.is_active == false) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "error",
                    text: "禁用",
                  },
                }),
              ]);
            }
          },
          filters: [
            {
              label: "启用",
              value: 0,
            },
            {
              label: "禁用",
              value: -1,
            },
          ],
          filterMultiple: false,
          filterRemote: (e) => {
            let v = "";
            if (e.length > 0) {
              v = e[0];
            }
            this.searchForm.status = v;
            this.searchForm.pageNumber = 1;
            this.getDataList();
          },
        },
        {
          title: "操作",
          key: "action",
          width: 170,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let enableOrDisable = "";
            if (params.row.is_active == true) {
              enableOrDisable = h(
                  "a",
                  {
                    style: {
                      color: '#FF9900'
                    },
                    on: {
                      click: () => {
                        this.disable(params.row);
                      },
                    },
                  },
                  "禁用"
              );
            } else {
              enableOrDisable = h(
                  "a",
                  {
                    style: {
                      color: '#19B16B'
                    },
                    on: {
                      click: () => {
                        this.enable(params.row);
                      },
                    },
                  },
                  "启用"
              );
            }
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
              enableOrDisable,
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
              }, '删除')
            ]);

          },
        },
      ],
      ruleValidate: {
        name: [
          {required: true, message: '请输入环境名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入环境地址', trigger: 'blur'},
        ],
        isactive: [
          {required: true, message: '请选择环境状态', trigger: 'blur', type: 'boolean'},
        ],
      },
      ruleValidate2: {
        name: [
          {required: true, message: '请输入环境名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入环境地址', trigger: 'blur'},
        ],
        isactive: [
          {required: true, message: '请选择环境状态', trigger: 'blur', type: 'boolean'},
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
      envlist().then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    handleSearch() {
      envreads(this.searchForm.title).then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    handleReset() {
      envlist().then(res => {
        const data = res.data.data
        this.data = data
      })
    },

    disable(v) {
      v.is_active = false
      envupdate(v, v.id).then(res => {
        this.$Message.success("禁用成功！");
      })
    },

    enable(v) {
      v.is_active = true
      envupdate(v, v.id).then(res => {
        this.$Message.success("启用成功！");
      })
    },


    remove(v) {
      envdelete(v.id).then(res => {
        this.$Message.success("删除成功！");
        this.getlist()
      })
    },

    cancel() {
      this.modal1=false
    },

    cancel2() {
      this.modal2=false
    },

    sure(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // if (this.crenvs.isactive==='启用') {
          //   this.crenvs.isactive = true
          // } else{
          //   this.crenvs.isactive = false
          // }
          const datas = {
          'name':this.crenvs.name,
          'base_url': this.crenvs.url,
          'is_active':this.crenvs.isactive,
          'desc':this.crenvs.desc
            }
            envcreate(datas).then(res => {
              this.getlist()
              this.modal1=false
              this.$Message.success('添加环境成功!');
            })
        }
    })
    },

    edit(name,v) {
      this.modal2=true
      this.envsid = v.id
      this.crenvs2.name = v.name
      this.crenvs2.url = v.base_url
      this.crenvs2.isactive = v.is_active
      this.crenvs2.desc = v.desc
    },
    sure2(name) {
      const datas = {
          'name':this.crenvs2.name,
          'base_url': this.crenvs2.url,
          'is_active':this.crenvs2.isactive,
          'desc':this.crenvs2.desc
            }
      this.$refs[name].validate((valid) => {
        if (valid) {
          envsupdate(this.envsid,datas).then(res => {
            this.getlist()
            this.modal2=false
            this.$Message.success('修改环境成功!');
          })
        }
    })
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
