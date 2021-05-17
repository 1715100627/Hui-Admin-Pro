<template>
  <div class="user_list-page flexC">
    <Tabs name="name1">

      <TabPane label="测试用例" tab="name1">
        <div class="user_list-page ">
          <div class="user_list-page" style="margin-bottom: 20px;">
            <div class="pageHead" style="padding-bottom: 15px;">
              <sapn>用例查询</sapn>
              <div style="display: inline-block;justify-content: space-between;float:right">
                <Button @click="handleSearch" type="primary" icon="ios-search" size='small'
                        style="margin-right: 10px;">查询
                </Button>
                <Button @click="handleReset('searchForm')" size='small'>重置</Button>
              </div>
            </div>
            <div class="pageHead">
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
              </Form>
            </div>
          </div>

          <div class="pageHead">
            <div style="display: flex;justify-content: space-between">
              <p>用例列表</p>
              <div>
                <Icon type="ios-leaf" size="24" color="rgb(45, 183, 245)"/>
                <i style="margin-right: 15px;">初始状态</i>
                <Icon type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                <i style="margin-right: 15px;">通过</i>
                <Icon type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                <i style="margin-right: 15px;">失败</i>
                <Button type="primary" size="small" @click="cremodel=true">创建用例</Button>
                <Button type="primary" size="small" @click="Batch" style="margin-left: 10px;">批量执行</Button>
                <template>
                  <Poptip
                      confirm
                      title="确认删除！"
                      @on-ok="ok"
                      @on-cancel="cancel"
                  >
                    <Button type="error" size="small" style="margin-left: 10px;">删除</Button>
                  </Poptip>
                </template>
              </div>

              <Modal v-model="cremodel" fullscreen title="创建用例">
                <Tabs name="name2">
                  <TabPane label="基础信息" tab="name2">
                    <Form ref="InsterModal" :model="InsterModal" :rules="ruleValiinter">
                      <div>
                        <FormItem label="用例名称" prop="name" style="margin-left: 20px;">
                          <Input
                              type="text"
                              v-model="InsterModal.name"
                              clearable
                              style="width: 1750px;"
                          />
                        </FormItem>
                      </div>

                      <FormItem label="所属项目" style="margin-left: 30px;">
                        <Select v-model="InsterModal.project" clearable style="width:1750px">
                          <Option v-for="item in prolist" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>

                      <FormItem label="关联接口" prop="interface" style="margin-left: 20px;">
                        <Select v-model="InsterModal.interface" clearable style="width:1750px">
                          <Option v-for="item in interlist" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>


                      <FormItem label="请求URL" prop="url" style="margin-left: 20px">
                        <Input style="width: 1750px" v-model="InsterModal.url">
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
                  <TabPane label="Headers参数" tab="name2">
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
                  <TabPane label="Body参数" tab="name2">
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
                  <TabPane label="用例期望结果" tab="name2">
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
                  <Button @click="createst('InsterModal')" type="primary">确定</Button>
                </div>
              </Modal>

              <Modal v-model="debug" fullscreen title="编辑|调试用例">
                <Tabs name="name2" v-model:value=testcaseset>
                  <TabPane label="基础信息" name="basics" tab="name2">
                    <Form ref="testcasesModal" :model="testcasesModal" :rules="ruleValiinter">
                      <div>
                        <FormItem label="运行环境(调试专用)" prop="envs">
                          <Select v-model="testcasesModal.envs" clearable style="width:1700px">
                            <Option v-for="item in envslist" :value="item.id" :key="item">{{ item.name }}</Option>
                          </Select>
                        </FormItem>
                      </div>

                      <div>
                        <FormItem label="用例名称" prop="name" style="margin-left: 53px;">
                          <Input
                              type="text"
                              v-model="testcasesModal.name"
                              clearable
                              style="width: 1700px;"
                          />
                        </FormItem>
                      </div>

                      <FormItem label="关联接口" prop="interface" style="margin-left: 53px;">
                        <Select v-model="testcasesModal.interface" clearable style="width:1700px">
                          <Option v-for="item in interlist2" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>


                      <FormItem label="请求URL" prop="url" style="margin-left: 53px">
                        <Input style="width: 1700px" v-model="testcasesModal.url">
                        </Input>
                      </FormItem>


                      <FormItem label="备注" style="margin-left: 90px;">
                        <Input
                            type="textarea"
                            v-model="testcasesModal.desc"
                            :rows=10
                            style="width: 1700px"
                        />
                      </FormItem>
                    </Form>


                  </TabPane>
                  <TabPane label="Headers参数" name="header" tab="name2">
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
                  <TabPane label="Body参数" name="body" tab="name2">
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
                  <TabPane label="期望结果" name="end" tab="name2">
                    <template>
                      <vue-json-editor
                          style="height: 740px"
                          v-model="exmodle2"
                          :showBtns="false"
                          :mode="'code'"
                          lang="zh"
                      />
                    </template>
                  </TabPane>
                  <TabPane label="用例调试" tab="name2" name="exp">
                    <div>
                      <label style="margin-left: 40px;margin-right: 10px;">执行时间</label>
                      <template>
                        <Input v-model="resultsModal.execute" icon="ios-calendar-outline" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">响应时长(ms)</label>
                      <template>
                        <Input v-model="resultsModal.elapsed" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">响应状态码</label>
                      <template>
                        <Input v-model="resultsModal.actual" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">调试结果</label>
                      <template>
                        <Input :value="resultsModal.status == 'PASS' ? '通过':'失败' " readonly
                               :class="resultsModal.status === 'PASS' ? 'inputSuccess': 'inputFail' "
                               style="width: 200px"></Input>
                      </template>
                    </div>

                    <vue-json-editor
                        style="height: 700px;margin-top: 20px;"
                        v-model="response_value"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </TabPane>
                </Tabs>
                <div slot="footer">
                  <Button @click="debug = false">取消</Button>
                  <Button @click="updatatest('testcasesModal')" type="primary">更新用例</Button>
                  <Button @click="debugtest('testcasesModal')">调试用例</Button>
                  <Button @click="createst3('testcasesModal')" type="primary">保存用例结果</Button>
                </div>
              </Modal>
            </div>
          </div>

          <div class="pageHead">
            <!--            用例列表渲染-->
            <Table
                border
                @on-selection-change="selectFun"
                :columns="columns"
                :data="data"
                sortable="custom"
                ref="table"
                size="small"
            >
              <template slot-scope="{ row }" slot="project|interface">
                <strong>{{ row.api.project.name }} - {{ row.api.name }}</strong>
              </template>

              <template slot-scope="{ row }" slot="status">
                <Icon v-if="row.status == 'INITIAL'" type="ios-leaf" size="24" color="rgb(45, 183, 245)"/>
                <Icon v-if="row.status == 'PASS'" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                <Icon v-if="row.status == 'FAIl'" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
              </template>

              <template slot-scope="{ row }" slot="level">
                <Select v-model="row.level" style="width:80px" prefix="ios-home" @on-change="partials(row)"
                        transfer>
                  <div slot="prefix" class="box"
                       :style="{'background-color':row.level === 'LOW' ? '#2db7f5':row.level === 'NORMAL' ? '#19be6b' :row.level==='HIGH' ? '#f90' :'#ed4014' }"></div>
                  <Option v-for="item in cityList" :value="item.value" :key="item.name">
                    {{ item.name }}
                  </Option>
                </Select>
              </template>

            </Table>
            <div>
              <Page
                  :total="testcasepage.total"
                  :page-size="testcasepage.size"
                  :current="testcasepage.index"
                  show-total
                  show-elevator
                  show-sizer
                  @on-change="testcasepageSize"
                  @on-page-size-change="testcasepagePage"
                  style="margin-top: 20px;"

              />
            </div>
          </div>
        </div>
      </TabPane>

      <TabPane label="测试场景" tab="name1">
        <div class="user_list-page ">
          <div class="user_list-page" style="margin-bottom: 20px;">
            <div class="pageHead">
              <p>场景查询</p>
            </div>
            <div class="pageHead">
              <Form ref="searchForm" :model="searchForm" inline :label-width="80">
                <FormItem label="所属项目" prop="project">
                  <Select v-model="searchForm.project" style="width:200px" clearable>
                    <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{ item.name }}</Option>
                  </Select>
                </FormItem>


                <FormItem label="场景名称" prop="name">
                  <Input
                      type="text"
                      v-model="searchForm.name"
                      placeholder="请输入接口名称"
                      clearable
                      style="width: 200px"
                  />
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

          <div class="pageHead">
            <div style="display: flex;justify-content: space-between">
              <p>场景列表</p>
              <div>
                <Icon type="ios-leaf" size="24" color="rgb(45, 183, 245)"/>
                <i style="margin-right: 15px;">初始状态</i>
                <Icon type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                <i style="margin-right: 15px;">全部通过</i>
                <Icon type="ios-leaf" size="24" color="rgb(255, 153, 0)"/>
                <i style="margin-right: 15px;">部分通过</i>
                <Icon type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                <i style="margin-right: 15px;">失败</i>
                <Button type="primary" size="small" @click="cretesttuite=true">创建场景</Button>
                <Button type="primary" size="small" @click="testsuiteBatch" style="margin-left: 10px;">批量执行</Button>
                <template>
                  <Poptip
                      confirm
                      title="确认删除！"
                      @on-ok="ok"
                      @on-cancel="cancel"
                  >
                    <Button type="error" size="small" style="margin-left: 10px;">删除</Button>
                  </Poptip>
                </template>
              </div>

              <Modal v-model="cremodel" fullscreen title="创建用例">
                <Tabs name="name2">
                  <TabPane label="基础信息" tab="name2">
                    <Form ref="InsterModal" :model="InsterModal" :rules="ruleValiinter">
                      <div>
                        <FormItem label="用例名称" prop="name" style="margin-left: 20px;">
                          <Input
                              type="text"
                              v-model="InsterModal.name"
                              clearable
                              style="width: 1750px;"
                          />
                        </FormItem>
                      </div>

                      <FormItem label="所属项目" style="margin-left: 30px;">
                        <Select v-model="InsterModal.project" clearable style="width:1750px">
                          <Option v-for="item in prolist" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>

                      <FormItem label="关联接口" prop="interface" style="margin-left: 20px;">
                        <Select v-model="InsterModal.interface" clearable style="width:1750px">
                          <Option v-for="item in interlist" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>


                      <FormItem label="请求URL" prop="url" style="margin-left: 20px">
                        <Input style="width: 1750px" v-model="InsterModal.url">
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
                  <TabPane label="Headers参数" tab="name2">
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
                  <TabPane label="Body参数" tab="name2">
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
                  <TabPane label="用例期望结果" tab="name2">
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
                  <Button @click="createst('InsterModal')" type="primary">确定</Button>
                </div>
              </Modal>

              <!--              创建场景-->
              <Modal v-model="cretesttuite" width="950" title="创建场景">
                <Form ref="crenvs" :model="crtestsuite" :rules="ruleValidate">
                  <div>
                    <FormItem label="场景名称" prop="name">
                      <Input
                          type="text"
                          v-model="crtestsuite.name"
                          clearable
                          style="width: 800px"
                      />
                    </FormItem>
                  </div>

                  <div>
                    <FormItem label="所属项目" prop="project">
                      <Select v-model="crtestsuite.project" style="width:800px">
                        <Option v-for="(item, key) in prolist" :value="item.id" :key="key">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </div>

                  <div>
                    <FormItem label="备注" style="margin-left: 38px;">
                      <Input
                          type="textarea"
                          v-model="crtestsuite.desc"
                          rows="5"
                          style="width: 800px"
                      />
                    </FormItem>
                  </div>
                </Form>


                <div slot="footer">
                  <Button @click="cretesttuite = false">取消</Button>
                  <Button @click="cretestsuite('InsterModal')" type="primary">确定</Button>
                </div>
              </Modal>

              <!--              编辑场景-->
              <Modal v-model="updatetesttuite" width="950" title="编辑场景">
                <Form ref="crenvs" :model="crtestsuite2" :rules="ruleValidate">
                  <div>
                    <FormItem label="场景名称" prop="name">
                      <Input
                          type="text"
                          v-model="crtestsuite2.name"
                          clearable
                          style="width: 800px"
                      />
                    </FormItem>
                  </div>

                  <div>
                    <FormItem label="所属项目" prop="project">
                      <Select v-model="crtestsuite2.project" multiple style="width:800px">
                        <Option v-for="(item, key) in envsname" :value="item.id" :key="key">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </div>

                  <div>
                    <FormItem label="备注" style="margin-left: 38px;">
                      <Input
                          type="textarea"
                          v-model="crtestsuite2.desc"
                          rows="5"
                          style="width: 800px"
                      />
                    </FormItem>
                  </div>
                </Form>


                <div slot="footer">
                  <Button @click="updatetesttuite = false">取消</Button>
                  <Button @click="createst('InsterModal')" type="primary">确定</Button>
                </div>
              </Modal>

              <!--              编辑|调试用例-->
              <Modal v-model="debug" fullscreen title="编辑|调试用例">
                <Tabs name="name2" v-model:value=testcaseset>
                  <TabPane label="基础信息" name="basics" tab="name2">
                    <Form ref="testcasesModal" :model="testcasesModal" :rules="ruleValiinter">
                      <div>
                        <FormItem label="运行环境(调试专用)" prop="envs">
                          <Select v-model="testcasesModal.envs" clearable style="width:1700px">
                            <Option v-for="item in envslist" :value="item.id" :key="item">{{ item.name }}</Option>
                          </Select>
                        </FormItem>
                      </div>

                      <div>
                        <FormItem label="用例名称" prop="name" style="margin-left: 53px;">
                          <Input
                              type="text"
                              v-model="testcasesModal.name"
                              clearable
                              style="width: 1700px;"
                          />
                        </FormItem>
                      </div>

                      <FormItem label="关联接口" prop="interface" style="margin-left: 53px;">
                        <Select v-model="testcasesModal.interface" clearable style="width:1700px">
                          <Option v-for="item in interlist2" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                      </FormItem>


                      <FormItem label="请求URL" prop="url" style="margin-left: 53px">
                        <Input style="width: 1700px" v-model="testcasesModal.url">
                        </Input>
                      </FormItem>


                      <FormItem label="备注" style="margin-left: 90px;">
                        <Input
                            type="textarea"
                            v-model="testcasesModal.desc"
                            :rows=10
                            style="width: 1700px"
                        />
                      </FormItem>
                    </Form>


                  </TabPane>
                  <TabPane label="Headers参数" name="header" tab="name2">
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
                  <TabPane label="Body参数" name="body" tab="name2">
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
                  <TabPane label="期望结果" name="end" tab="name2">
                    <template>
                      <vue-json-editor
                          style="height: 740px"
                          v-model="exmodle2"
                          :showBtns="false"
                          :mode="'code'"
                          lang="zh"
                      />
                    </template>
                  </TabPane>
                  <TabPane label="用例调试" tab="name2" name="exp">
                    <div>
                      <label style="margin-left: 40px;margin-right: 10px;">执行时间</label>
                      <template>
                        <Input v-model="resultsModal.execute" icon="ios-calendar-outline" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">响应时长(ms)</label>
                      <template>
                        <Input v-model="resultsModal.elapsed" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">响应状态码</label>
                      <template>
                        <Input v-model="resultsModal.actual" readonly
                               style="width: 200px"></Input>
                      </template>

                      <label style="margin-left: 40px;margin-right: 10px;">调试结果</label>
                      <template>
                        <Input :value="resultsModal.status == 'PASS' ? '通过':'失败' " readonly
                               :class="resultsModal.status === 'PASS' ? 'inputSuccess': 'inputFail' "
                               style="width: 200px"></Input>
                      </template>
                    </div>

                    <vue-json-editor
                        style="height: 700px;margin-top: 20px;"
                        v-model="response_value"
                        :showBtns="false"
                        :mode="'code'"
                        lang="zh"
                    />
                  </TabPane>
                </Tabs>
                <div slot="footer">
                  <Button @click="debug = false">取消</Button>
                  <Button @click="updatatest('testcasesModal')" type="primary">更新用例</Button>
                  <Button @click="debugtest('testcasesModal')">调试用例</Button>
                  <Button @click="createst3('testcasesModal')" type="primary">保存用例结果</Button>
                </div>
              </Modal>

              <!--              组织场景-->
              <Modal v-model="creatsuite" fullscreen title="项目：">

                <!--                用例源-->
                <div style="border: 1px solid #dcdee2;">
                  <div class="testcase" style="padding-bottom: 16px">
                    <span>用例源</span>
                    <div style="display: inline-block;justify-content: space-between;float:right">
                      <Button @click="handleSearch" type="primary" icon="ios-search" size='small'
                              style="margin-right: 10px;">搜索
                      </Button>
                      <Button @click="handleReset('searchForm')" size='small'>重置</Button>
                    </div>
                  </div>
                </div>
                <div style="border: 1px solid #dcdee2;">
                  <div style="margin-top: 15px;">
                    <Form ref="searchForm" :model="searchForm" inline :label-width="120">
                      <FormItem label="接口所属模块" prop="project">
                        <Select v-model="searchForm.project" style="width:440px" clearable>
                          <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{
                              item.name
                            }}
                          </Option>
                        </Select>
                      </FormItem>


                      <FormItem label="请求接口" prop="name">
                        <Input
                            type="text"
                            v-model="searchForm.name"
                            placeholder="请输入接口名称"
                            clearable
                            style="width: 300px"
                        />
                      </FormItem>

                      <FormItem label="用例名称" prop="project">
                        <Select v-model="searchForm.project" style="width:300px" clearable>
                          <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{
                              item.name
                            }}
                          </Option>
                        </Select>
                      </FormItem>

                      <FormItem label="重要级别" prop="project">
                        <Select v-model="searchForm.project" style="width:300px" clearable>
                          <Option v-for="(item, key) in projectnames" :value="item.id" :key="key">{{
                              item.name
                            }}
                          </Option>
                        </Select>
                      </FormItem>
                    </Form>
                  </div>
                  <Table
                      border
                      @on-selection-change="selectFun"
                      :columns="creatsuiteumns"
                      :data="testcasedata"
                      sortable="custom"
                      ref="table"
                      size="small"
                      style="clear:both;width: 1836px;margin-left: 15px;"
                  >
                    <template slot-scope="{ row }" slot="os">
                      <Button style="color: #2d8cf0" @click="addtestcase(row)" ghost>选择</Button>
                    </template>

                    <template slot-scope="{ row }" slot="interface">
                      <strong>{{ row.api.name }}</strong>
                    </template>

                    <template slot-scope="{ row }" slot="status">
                      <Icon v-if="row.status == 'INITIAL'" type="ios-leaf" size="24" color="rgb(45, 183, 245)"/>
                      <Icon v-if="row.status == 'PASS'" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                      <Icon v-if="row.status == 'FAIl'" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
                    </template>

                    <template slot-scope="{ row }" slot="level">
                      <Select v-model="row.level" style="width:80px" prefix="ios-home" @on-change="partials(row)"
                              transfer>
                        <div slot="prefix" class="box"
                             :style="{'background-color':row.level === 'LOW' ? '#2db7f5':row.level === 'NORMAL' ? '#19be6b' :row.level==='HIGH' ? '#f90' :'#ed4014' }"></div>
                        <Option v-for="item in cityList" :value="item.value" :key="item.name">
                          {{ item.name }}
                        </Option>
                      </Select>
                    </template>

                  </Table>
                  <div style="margin-bottom: 15px;">
                    <Page
                        :total="testcasepage.total"
                        :page-size="testcasepage.size"
                        :current="testcasepage.index"
                        show-total
                        show-elevator
                        show-sizer
                        @on-change="testcasepageSize"
                        @on-page-size-change="testcasepagePage"
                        style="margin-top: 20px;padding-left: 16px;"

                    />
                  </div>
                </div>

                <!--                组织用例-->
                <div style="border: 1px solid #dcdee2;margin-top: 15px">
                  <div class="testcase" style="padding-bottom: 16px">
                    <span>组织用例 (拖动调整顺序)</span>
                    <div style="display: inline-block;justify-content: space-between;float:right">
                      <span style="margin-right: 5px;">从已有场景添加用例:</span>
                      <Select v-model="model1" style="width:200px;margin-right: 10px;">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <Button @click="handleSearch" type="primary" icon="ios-search" size='small'
                              style="margin-right: 10px;">搜索
                      </Button>
                      <Button @click="handleReset('searchForm')" size='small'>重置</Button>
                    </div>
                  </div>
                </div>
                <div style="border: 1px solid #dcdee2;padding-top: 20px;padding-bottom: 20px;">
                  <Table
                      border
                      draggable
                      @on-drag-drop="onDragDrop"
                      @on-selection-change="selectFun"
                      :columns="testcasesort"
                      :data="organizationtest"
                      sortable="custom"
                      ref="table"
                      size="small"
                      style="clear:both;width: 1836px;margin-left: 15px;"
                  >
                    <template slot-scope="{ row }" slot="testcase_name">
                      <Input @input="inputchange(row)" v-model="row.testcase_name" style="width: 260px"/>
                      <!--                                            <Input @input="inputchange(row)" v-model="row.name ||row.testcase_name || row.testcase.name" style="width: 260px"/>-->
                    </template>


                    <template slot-scope="{ row }" slot="frequency">
                      <InputNumber v-model="value7" readonly></InputNumber>
                    </template>

                    <template slot-scope="{ row }" slot="interface">
                      <strong v-if="row.api">{{ row.api.name }}</strong>
                      <strong v-else>{{ row.testcase.api.name }}</strong>
                    </template>

                    <template slot-scope="{ row }" slot="action">
<!--                      <template>-->
<!--                        <i-switch v-model="row.is_execute"/>-->
<!--                      </template>-->

                      <i-switch size="large" v-model="row.is_execute" @on-change="change(row)">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                      </i-switch>
                    </template>

                  </Table>
                </div>

                <div slot="footer">
                  <Button @click="creatsuite = false">取消</Button>
                  <Button @click="organization" type="primary">确定</Button>
                </div>
              </Modal>


            </div>
          </div>

          <div class="pageHead">
            <!--           场景列表渲染-->
            <Table
                border
                @on-selection-change="testsuiteselectFun"
                :columns="scenariocolumns"
                :data="scenariodata"
                sortable="custom"
                ref="table"
                size="small"
            >
              <template slot-scope="{ row }" slot="project">
                <strong>{{ row.project.name }}</strong>
              </template>

              <template slot-scope="{ row }" slot="testcases">
                <!--                <strong>{{ row.testcases.name }}</strong>-->
                <samp v-for="item in row.testcases">{{ item.name }} </samp>
              </template>

              <template slot-scope="{ row }" slot="status">
                <Icon v-if="row.status == 'INITIAL'" type="ios-leaf" size="24" color="rgb(45, 183, 245)"/>
                <Icon v-if="row.status == 'PASS'" type="ios-leaf" size="24" color="rgb(25, 190, 107)"/>
                <Icon v-if="row.status == 'FAIl'" type="ios-leaf" size="24" color="rgb(237, 64, 20)"/>
              </template>

              <template slot-scope="{ row }" slot="level">
                <Select v-model="row.level" style="width:80px" prefix="ios-home" @on-change="partials(row)"
                        transfer>
                  <div slot="prefix" class="box"
                       :style="{'background-color':row.level === 'LOW' ? '#2db7f5':row.level === 'NORMAL' ? '#19be6b' :row.level==='HIGH' ? '#f90' :'#ed4014' }"></div>
                  <Option v-for="item in cityList" :value="item.value" :key="item.name">
                    {{ item.name }}
                  </Option>
                </Select>
              </template>

            </Table>
            <div>
              <Page
                  :total="testcasepage.total"
                  :page-size="testcasepage.size"
                  :current="testcasepage.index"
                  show-total
                  show-elevator
                  show-sizer
                  @on-change="testcasepageSize"
                  @on-page-size-change="testcasepagePage"
                  style="margin-top: 20px;"

              />
            </div>
          </div>
        </div>
      </TabPane>

      <TabPane label="测试场景集" tab="name1">
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {
  testcaselist,
  projectlist,
  apilist,
  createstcase,
  envlist,
  testdebug,
  uptest,
  partial,
  testcase_Batch,
  testsuitelist,
  crtestsuite,
  testsuite2testcase,
  gettestsuite2testcase,
  testsuite_Batch
} from '../../api/api'
import vueJsonEditor from "vue-json-editor";

export default {
  name: "testcase",
  components: {vueJsonEditor},
  data() {
    return {
      // testsuite_data:{
      //   testsuite:'',
      //   sort:'',
      //   testsuite_name:'',
      //
      //   url:'',
      //   api: {},
      //   create_time: "",
      //   expect_result: "",
      //   headers: "",
      //   id: '',
      //   is_delete: '',
      //   level: "",
      //   name: "",
      //   request_data: "",
      //   request_data_type: "",
      //   request_params: '',
      //   status: "",
      //   update_time: "",
      // },
      projectnames: [],
      testsuite_id: "",
      testsuite_name: "",
      testcasedata: [],
      creatsuite: false,
      crtestsuite: {
        name: '',
        project: '',
        desc: ''
      },
      crtestsuite2: {
        name: '',
        project: '',
        desc: ''
      },
      levelmodel: '',
      cityList: [{
        name: '低',
        value: 'LOW'
      },
        {
          name: '中',
          value: 'NORMAL'
        },
        {
          name: '高',
          value: 'HIGH'
        },
        {
          name: '更高',
          value: 'HIGHER'
        }
      ],
      ruleValidate: {
        name: [
          {required: true, message: '请输入场景名称', trigger: 'blur'}
        ],
        project: [
          {required: true, message: '请选择所属项目', trigger: 'blur'},
        ]
      },
      testcasepage: {
        index: 1,
        size: 10,
        total: 50
      },
      MultilineId: {},
      testsuiteMultilineId: {},
      testcaseID: '',
      testcaseset: 'basics',
      response_value: {},
      debug: false,
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
      exmodle2: {
        "output": [],
        "validate": [
          {
            "check": "status_code",
            "expect": 200,
            "comparator": "eq"
          }
        ]
      },
      method: "Json",
      method2: "Json",
      bodymodle: {},
      bodymodle2: {},
      headersmodle: {
        "Content-Type": "application/json"
      },
      headersmodle2: {
        "Content-Type": "application/json"
      },
      prolist: [],
      interlist: [],
      interlist2: [],
      envslist: [],
      InsterModal: {
        name: '',
        project: '',
        interface: '',
        url: '',
        desc: ''
      },
      testcasesModal: {
        envs: '',
        name: '',
        project: '',
        interface: '',
        url: '',
        desc: ''
      },
      resultsModal: {
        execute: '',
        elapsed: '',
        actual: '',
        status: ''
      },
      cremodel: false,
      cretesttuite: false,
      updatetesttuite: false,
      searchForm: {},
      testcasecilp: false,
      data: [],
      scenariodata: [],
      organizationtest: [],
      ruleValiinter: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        interface: [
          {required: true, message: '请选择关联接口', trigger: 'blur', type: 'number'},
        ],
        url: [
          {required: true, message: '请输入请求地址', trigger: 'blur'},
        ],
      },
      columns: [
        {
          type: 'selection',
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
          slot: "project|interface",
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
          width: 260,
        },
        {
          title: "Body参数类型",
          key: "request_data_type",
          align: "center",
          width: 260,
        },
        {
          title: "Body参数",
          key: "request_data",
          align: "center",
          width: 260,
        },
        {
          title: "期望结果",
          key: "expect_result",
          align: "center",
          width: 260,
        },
        {
          title: "重要级别",
          slot: "level",
          align: "center",
          width: 120,
          fixed: "right",
        },
        {
          title: "状态",
          slot: "status",
          align: "center",
          width: 70,
          fixed: "right",

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
                  "复制"
              ),
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
                  "编辑"
              ),

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
                  "调试"
              )

            ])
                ;

          },
        },
      ],
      scenariocolumns: [
        {
          type: 'selection',
          width: 60,
          align: "center",
        },
        {
          title: "场景名称",
          key: "name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "所属项目",
          slot: "project",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "测试用例",
          slot: "testcases",
          align: "center",
          width: 520,
        },
        {
          title: "重要级别",
          slot: "level",
          align: "center",
          width: 120,
          fixed: "right",
        },
        {
          title: "状态",
          slot: "status",
          align: "center",
          width: 70,
          fixed: "right",

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
                  "复制"
              ),
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
                        this.upsuite(params.row);
                      },
                    },
                  },
                  "编辑"
              ),

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
                        this.cresuite(params.row);
                      },
                    },
                  },
                  "组织场景"
              )

            ])
                ;

          },
        },
      ],
      creatsuiteumns: [
        {
          title: "操作",
          slot: "os",
          align: "center",
          width: 80,
        },
        {
          title: "用例名称",
          key: "name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "接口",
          slot: "interface",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "请求URL",
          key: "url",
          align: "center",
          width: 300,
        },
        {
          title: "Headers参数",
          key: "headers",
          align: "center",
          width: 250,
        },
        {
          title: "Body参数类型",
          key: "request_data_type",
          align: "center",
          width: 120,
        },
        {
          title: "Body参数",
          key: "request_data",
          align: "center",
          width: 250,
        },
        {
          title: "期望结果",
          key: "expect_result",
          align: "center",
          width: 300,
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center",
          width: 160,
        },
        {
          title: "更新时间",
          key: "update_time",
          align: "center",
          width: 160,
        },
        {
          title: "重要级别",
          slot: "level",
          align: "center",
          width: 120,
          fixed: "right",
        },
        {
          title: "状态",
          slot: "status",
          align: "center",
          width: 70,
          fixed: "right",

        },
      ],
      testcasesort: [
        {
          title: "用例名称",
          slot: "testcase_name",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "循环次数",
          slot: "frequency",
          align: "center",
          width: 120,
        },
        {
          title: "接口名称",
          slot: "interface",
          align: "center",
          minWidth: 125,
          width: 300,
        },
        {
          title: "请求URL",
          key: "url",
          align: "center",
          width: 300,
        },
        {
          title: "Headers参数",
          key: "headers",
          align: "center",
          width: 250,
        },
        {
          title: "Body参数类型",
          key: "request_data_type",
          align: "center",
          width: 120,
        },
        {
          title: "Body参数",
          key: "request_data",
          align: "center",
          width: 250,
        },
        {
          title: "期望结果",
          key: "expect_result",
          align: "center",
          width: 300,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 190,
          fixed: "right",
        },
      ],
    }
  },
  created() {
    this.getlist();
    this.getprolist();
    this.intlist();
    this.envsList();
    this.gettestsuite();
  }
  ,
  methods: {
    change (row) {
      debugger
      this.$set(this.organizationtest[row._index], 'is_execute', row.is_execute)
      console.log(row)
      console.log(this.organizationtest)
        },

    inputchange(row) {
      this.$set(this.organizationtest[row._index], 'testcase_name', row.testcase_name)
      // for (let i = 0; i < this.organizationtest.length; i++)
      //   this.$set(this.organizationtest[i], 'name', row[i].name)
      console.log(row)
      console.log(this.organizationtest)
    },

    organization() {
      // JSON.parse(JSON.stringify(this.organizationtest))

      for (let i = 0; i < this.organizationtest.length; i++) {
        this.organizationtest[i].sort = i
        this.organizationtest[i].testsuite_id = this.testsuite_id
        this.organizationtest[i].testsuite_name = this.testsuite_name
        if (this.organizationtest[i].id) {
          this.organizationtest[i].testcase_id = this.organizationtest[i].id
        } else {
          this.organizationtest[i].testcase_id = this.organizationtest[i].testcase.id
        }

        // if (this.organizationtest[i].name) {
        //   this.organizationtest[i].testcase_name = this.organizationtest[i].name
        // } else {
        //   this.organizationtest[i].testcase_name = this.organizationtest[i].testcases.name
        // }
        // datas[i].testcase_name = datas[i].name
        delete this.organizationtest[i].api
        delete this.organizationtest[i].name
        delete this.organizationtest[i].level
        delete this.organizationtest[i].status
        delete this.organizationtest[i]._index
        delete this.organizationtest[i]._rowKey
        delete this.organizationtest[i].testsuite
        delete this.organizationtest[i].testcase
        delete this.organizationtest[i].id
      }
      let data = {
        'testsuite_id': this.testsuite_id,
        'data': this.organizationtest
      }
      testsuite2testcase(data).then(res => {
        this.$Message.success('用例组织成功！')
        this.gettestsuite()
        this.creatsuite = false
      })
    },


    onDragDrop(first, end) {
      first = parseInt(first)
      end = parseInt(end)
      let tmp = this.organizationtest[first]

      if (first < end) {
        for (var i = first + 1; i <= end; i++) {
          this.organizationtest.splice(i - 1, 1, this.organizationtest[i])
        }
        this.organizationtest.splice(end, 1, tmp)
      }

      if (first > end) {
        for (var y = first; y > end; y--) {
          this.organizationtest.splice(y, 1, this.organizationtest[y - 1])
        }
        this.organizationtest.splice(end, 1, tmp)
      }

      //重置排序值
      let index = 1
      this.organizationtest.forEach(e => {
        e.sort = index
        index++
      })
      //排序值重置后，向后台发送请求，更新数据库中数据的排序，这里就不写了
      //axios

    },

    selectFun(row) {
      this.MultilineId = row
    }
    ,

    testsuiteselectFun(row) {
      this.testsuiteMultilineId = row
    },

    addtestcase(row) {
      debugger
      row.is_execute = false
      this.organizationtest.push(row)

      for (let i = 0; i < this.organizationtest.length; i++) {
        if (!this.organizationtest[i].testcase_name) {
          this.organizationtest[i].testcase_name = this.organizationtest[i].name
        }
        if (this.organizationtest[i].name) {
          delete this.organizationtest[i].name
        }

      }
      this.organizationtest = JSON.parse(JSON.stringify(this.organizationtest))
    }
    ,

    cresuite(row) {
      this.creatsuite = true
      this.testsuite_id = row.id
      this.testsuite_name = row.name
      let data = {'testsuite': row.id}
      gettestsuite2testcase(data).then(res => {
        this.organizationtest = res.data.data
        // let datas = JSON.parse(JSON.stringify(this.organizationtest))
        console.log(this.organizationtest)
      })
    }
    ,

    cretestsuite() {
      let datas = {
        'name': this.crtestsuite.name,
        'project': JSON.parse(this.crtestsuite.project),
        'desc': this.crtestsuite.desc,
      }
      crtestsuite(datas).then(res => {
        this.cretesttuite = false
        this.$Message.success('创建场景成功！')
        this.gettestsuite()
      })
    }
    ,

    upsuite(pw) {
      this.updatetesttuite = true
      this.crtestsuite2.name = pw.name
      this.desc = pw.desc
    }
    ,

    partials(row) {
      const datas = {
        'level': row.level
      }
      partial(row.id, datas).then(res => {
        this.$Message.success('已更新用例权重值!')
      })
    }
    ,

    updatatest() {
      let datas = {
        "name": this.testcasesModal.name,
        "api": this.testcasesModal.interface,
        "url": this.testcasesModal.url,
        "request_data_type": this.method2,
        "desc": this.testcasesModal.desc,
        "tester": "测试人员",
        "headers": JSON.stringify(this.headersmodle2),
        "request_data": JSON.stringify(this.bodymodle2),
        "expect_result": JSON.stringify(this.exmodle2),
      }
      uptest(this.testcaseID, datas).then(res => {
        this.debug = false
        this.getlist()
        this.$Message.success('更新成功')
      })
    }
    ,

    debugtest() {
      this.testcaseset = "exp"
      let datas = {
        'env_id': this.testcasesModal.envs,
        'testcase': {
          'name': this.testcasesModal.name,
          'api': this.testcasesModal.interface,
          'url': this.testcasesModal.url,
          'headers': this.headersmodle2,
          'request_data_type': this.method2,
          'request_params': '',
          'request_data': this.bodymodle2,
          'expect_result': this.exmodle2,
          'decs': this.testcasesModal.desc
        }
      }
      testdebug(datas).then(res => {
        this.resultsModal.execute = res.data.data.execute_time
        this.resultsModal.elapsed = res.data.data.elapsed_ms
        this.resultsModal.actual = res.data.data.actual_status_code
        this.resultsModal.status = res.data.data.status
        this.response_value = res.data.data.actual_response_data
      })
    }
    ,
    envsList() {
      envlist().then(res => {
        this.envslist = res.data.data
      })
    }
    ,

    enable(pw) {
      this.debug = true
      this.testcaseID = pw.id
      this.testcasesModal.name = pw.name
      this.testcasesModal.url = pw.url
      this.testcasesModal.desc = pw.desc
      this.testcasesModal.interface = pw.api
      this.headersmodle2 = JSON.parse(pw.headers)
      this.method2 = JSON.parse(pw.request_data_type)
      this.bodymodle2 = JSON.parse(pw.request_data)
      this.exmodle2 = JSON.parse(pw.expect_result)
    }
    ,

    getlist() {
      let data = {
        'size': this.testcasepage.size,
        'page': this.testcasepage.index
      }
      testcaselist(data).then(res => {
        let data = res.data.data
        this.data = data
        this.testcasepage.total = res.count
        this.testcasedata = data
      })
    }
    ,

    gettestsuite() {
      testsuitelist().then(res => {
        this.scenariodata = res.data.data
      })
    }
    ,

    testcasepageSize(e) {
      let data = {
        'size': this.testcasepage.size,
        'page': e
      }
      testcaselist(data).then(res => {
        let data = res.data.data
        this.data = data
        this.testcasepage.total = res.count

      })
    }
    ,
    testcasepagePage(e) {
      let data = {
        'size': e,
        'page': this.testcasepage.index
      }
      testcaselist(data).then(res => {
        let data = res.data.data
        this.data = data
        this.testcasepage.total = res.count
      })
    }
    ,

    getprolist() {
      projectlist().then(res => {
        this.prolist = res.data.data
      })
    }
    ,

    intlist() {
      apilist().then(res => {
        this.interlist = res.data.data
        this.interlist2 = res.data.data
      })
    }
    ,

    createst(name) {
      let datas = {
        "name": this.InsterModal.name,
        "api": this.InsterModal.interface,
        "url": this.InsterModal.url,
        "request_data_type": this.method,
        "desc": this.InsterModal.desc,
        "tester": "测试人员",
        "headers": JSON.stringify(this.headersmodle),
        "request_data": JSON.stringify(this.bodymodle),
        "expect_result": JSON.stringify(this.exmodle),
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          createstcase(datas).then(res => {
            this.cremodel = false
            this.$Message.success('创建用例成功！')
            this.$refs[name].resetFields();
            this.getlist();
          })
        }
      })
    }
    ,

    Batch() {
      let list = []
      let row = this.MultilineId
      for (var i = 0; i < row.length; i++) {
        list.push(row[i].id)
      }
      let data = {
        'testcases': list
      }
      testcase_Batch(data).then(res => {
        this.$Message.success(res.data)
      })
    },

    testsuiteBatch() {
      let list = []
      let data = this.testsuiteMultilineId
      for (var i = 0; i < data.length; i++) {
        list.push(JSON.stringify(data[i].id))
      }


      testsuite_Batch(list).then(res => {
        this.$Message.success(res.data)
      })
    },
  }
}
</script>

<style lang="less">
.box {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.jsoneditor-vue {
  height: 100%;
}

.inputSuccess :nth-last-child(1) {
  color: #19be6b !important;
}

.inputFail :nth-last-child(1) {
  color: red !important;
  width: 100px;
}

.testcase {
  padding: 16px 32px 0 32px;
  background: #fff;

  p {
    margin-bottom: 16px;
  }

  & > p:first-child {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
  }

  & > p:last-child {
    font-size: 14px;
  }
}
</style>