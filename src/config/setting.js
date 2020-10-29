import Vue from "vue";
import vuex from "@/store";
import * as api from "@/service/FileService";
import MoveBox from "@/components/messagebox/MoveBox"
import RenameBox from "@/components/messagebox/RenameBox"
import ShareBox from "@/components/messagebox/ShareBox"

const vm = new Vue();

const triggerCondition = function(trigger) {
  return trigger
}
const trueCondition = function() { return true }

/**
 * 右键菜单配置，目前只支持二级菜单
 * title：菜单内容名称
 * condition：此内容的渲染条件
 * func：点击触发时间
 * subMenu：子菜单对象
 */
const menu = [
  {
    title: "新建",
    condition: triggerCondition,
    subMenu: [
      {
        title: "笔记",
        callback: function(e) {
          let now = new Date().getTime();
          let file = {
            folderId: vuex.getters.getFolderId,
            type: 1,
            title: "未命名笔记",
            body: "",
            topping: false,
            foldered: false,
            created: now,
            updated: now
          };
          api.createFile(file).then(resp => {
            vuex.dispatch("createFile", resp.data);
          });
        }
      },
      {
        title: "文件夹",
        callback: function(e) {
          let now = new Date().getTime();
          let file = {
            folderId: vuex.getters.getFolderId,
            type: 1,
            title: "未命名文件夹",
            body: "",
            topping: false,
            foldered: true,
            created: now,
            updated: now
          };
          api.createFile(file).then(resp => {
            vuex.dispatch("createFolder", resp.data.body);
          });
        }
      },
      {
        title: "上传文件",
        callback: function(e) {
          console.log("上传文件");
          // 调用上传
        }
      }
    ]
  },
  {
    title: "删除",
    condition: triggerCondition,
    callback: function(e) {
      let target = vuex.getters.getTarget;
      api.deleteFile(target).then(resp => {
        if (resp.status === 200) {
          vm.$message.success(resp.data);
          api.getFolderFiles(vuex.getters.getFolderId).then(resp => {
            vuex.dispatch("setFiles", r.data);
          });
        }
      });
    }
  },
  {
    title: "排序",
    condition: trueCondition,
    subMenu: [
      {
        title: '默认',
        callback: function(e) {
          vuex.state.config.set("order", vuex.state.config.defaultOrder)
        }
      },
      {
        title: '名称',
        callback: function(e) {
          vuex.state.config.set("order", function(a, b) {
            return 1
          })
        }
      },
      {
        title: '创建时间',
        callback: function(e)  {
          vuex.state.config.set("order", function(a, b) {
            return new Date(a.created).getTime() > new Date(b.created).getTime() ? -1 : 1
          })
        }
      }
    ]
  },
  {
    title: "下载",
    condition: triggerCondition,
    callback: function(e) {
      let fileId = vuex.state.target
      vm.$message.info("文件准备中……请等待！")
      api.download(fileId).then(response => {
        // 提取文件名
        const fileName = response.headers['content-disposition'].match(/filename=(.*)/)[1]
        // 将二进制流转为blob
        const blob = new Blob([response.data], { type: 'application/octet-stream' })
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
          window.navigator.msSaveBlob(blob, decodeURI(fileName))
        } else {
          // 创建新的URL并指向File对象或者Blob对象的地址
          const blobURL = window.URL.createObjectURL(blob)
          // 创建a标签，用于跳转至下载链接
          const tempLink = document.createElement('a')
          tempLink.style.display = 'none'
          tempLink.href = blobURL
          tempLink.setAttribute('download', decodeURI(fileName))
          // 兼容：某些浏览器不支持HTML5的download属性
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank')
          }
          // 挂载a标签
          document.body.appendChild(tempLink)
          tempLink.click()
          document.body.removeChild(tempLink)
          // 释放blob URL地址
          window.URL.revokeObjectURL(blobURL)
        }
      })
    },
  },
  {
    title: "置顶",
    condition: triggerCondition,
    callback: function(e) {
      let fileId = vuex.state.target
      api.toppingFile(fileId).then(resp => {
        vm.$message.success(resp.data)
      })
    },
  },
  {
    title: "移动到",
    condition: triggerCondition,
    callback: function(e) {
      let form = {
        folders: JSON.parse(JSON.stringify(vuex.state.folders))
      }
      let fileCopy, index
      for(let i = 0; i < vuex.state.files.length; i++) {
        if(vuex.state.files[i].id == vuex.state.target) {
          index = i
          fileCopy = JSON.parse(JSON.stringify(vuex.state.files[i]))
          form.file = vuex.state.files[i]
          break
        }
      }
      const h = vm.$createElement;
      form.folders.push({id: 0, title: "根目录"})
      vm.$msgbox({
          title: '移动到',
          message: h(MoveBox, {
            props: { formData: form } 
          }),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(action => {
          if(action === "confirm") {
            let file = vuex.state.files[index]
            api.update(file).then(resp => {
                vm.$message.success(resp.data)
            })
          }
        }).catch(action => {
          vuex.state.files[index].folderId = fileCopy.folderId
        });
    },
  },
  {
    title: "重命名",
    condition: triggerCondition,
    callback: function(e) {
      let form = {}
      let fileCopy, index
      for(let i = 0; i < vuex.state.files.length; i++) {
        if(vuex.state.files[i].id == vuex.state.target) {
          index = i
          fileCopy = JSON.parse(JSON.stringify(vuex.state.files[i]))
          form.file = vuex.state.files[i]
          break
        }
      }
      const h = vm.$createElement;
      vm.$msgbox({
          title: '重命名',
          message: h(RenameBox, {
            props: { formData: form } 
          }),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(action => {
          if(action === "confirm") {
            let file = vuex.state.files[index]
            api.update(file).then(resp => {
              vm.$message.success(resp.data)
            })
          }
        }).catch(action => {
          vuex.state.files[index].title = fileCopy.title
        });
    },
  },
  {
    title: "分享",
    condition: triggerCondition,
    callback: function(e) {
      api.shareFile(vuex.state.files[vuex.state.currentFileIndex]).then(resp => {
        let form = { link: resp.data }
        const h = vm.$createElement;
        vm.$msgbox({
            title: '分享',
            message: h(ShareBox, {
              props: { formData: form } 
            }),
            center: true,
            showCancelButton: false,
            confirmButtonText: "复制",
            beforeClose: function(action, instance, done) {
              if(action === "confirm") {
                var range = document.createRange();
                var selection = window.getSelection()
                selection.removeAllRanges()
                console.log(instance)
                range.selectNodeContents(instance.$el)
                selection.addRange(range)
                document.execCommand('copy')
                selection.removeAllRanges()
              }
              done()
            }
          }).then(action => {
          }).catch(action => {});
      })
    },
  }
];

export { menu };
