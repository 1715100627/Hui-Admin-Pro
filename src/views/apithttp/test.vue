<template>

</template>

<script>
export default {
name: "test",


  methods: {
    formatModuleTreeData() {
      if (this.searchParams.project) {
        getModuleNames({ project: this.searchParams.project }).then((res) => {
          let data = res.data;
          this.modules = data;
          data = data.map((item) => {
            return {
              id: item.id,
              title: item.name,
              parent: item.parent,
              expand: true,
              is_system: item.is_system,
              floor: item.floor,
              project: item.project,
              remark: item.remark,
              render: (h, { root, node, data }) => {
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    },
                  },
                  [
                    h("span", {}, data.title),
                    h("span", {}, [
                      h(
                        "tooltip",
                        {
                          props: {
                            content: "创建子模块",
                            transfer: true,
                          },
                        },
                        [
                          h("Button", {
                            props: {
                              icon: "md-add",
                              type: "text",
                              size: "small",
                            },
                            style: {
                              color: "#2d8cf0",
                              display:
                                permissionFunc("MODULE_CREATE") &&
                                !data.is_system &&
                                data.floor !== 4
                                  ? "inline"
                                  : "none",
                            },
                            on: {
                              click: () => {
                                if (
                                  permissionFunc("MODULE_CREATE") &&
                                  !data.is_system &&
                                  data.floor !== 4
                                ) {
                                  this.parentModule = data.id;
                                  this.showCreateModuleModal();
                                }
                              },
                            },
                          }),
                        ]
                      ),
                      h(
                        "tooltip",
                        {
                          props: {
                            content: "编辑模块",
                            transfer: true,
                          },
                        },
                        [
                          h("Button", {
                            props: {
                              icon: "md-create",
                              type: "text",
                              size: "small",
                            },
                            style: {
                              color: "#2d8cf0",
                              display:
                                permissionFunc("MODULE_EDIT") && !data.is_system
                                  ? "inline"
                                  : "none",
                            },
                            on: {
                              click: () => {
                                if (
                                  permissionFunc("MODULE_EDIT") &&
                                  !data.is_system
                                ) {
                                  let tempModule = {
                                    project: data.project ? data.project : "",
                                    id: data.id,
                                    name: data.title,
                                    parent: data.parent,
                                    remark: data.remark,
                                  };
                                  this.module = tempModule;
                                  this.editModule = true;
                                }
                              },
                            },
                          }),
                        ]
                      ),
                      h(
                        "tooltip",
                        {
                          props: {
                            content: "删除模块",
                            transfer: true,
                          },
                        },
                        [
                          h("Button", {
                            props: {
                              icon: "md-remove",
                              type: "text",
                              size: "small",
                            },
                            style: {
                              color: "#ed4014",
                              display:
                                permissionFunc("MODULE_DELETE") &&
                                !data.is_system
                                  ? "inline"
                                  : "none",
                            },
                            on: {
                              click: () => {
                                if (
                                  permissionFunc("MODULE_DELETE") &&
                                  !data.is_system
                                ) {
                                  this.handleDeleteModule(data.id);
                                }
                              },
                            },
                          }),
                        ]
                      ),
                    ]),
                  ]
                );
              },
            };
          });
          let arrayToTree = require("array-to-tree");
          this.moduleTreeData = arrayToTree(data, {
            parentProperty: "parent",
            childrenProperty: "children",
            customID: "id",
          });
        });
      }
    },
  }
}
</script>

<style scoped>

</style>

