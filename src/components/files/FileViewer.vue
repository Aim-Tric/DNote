<template>
  <el-container class="viewer"
                v-if="file">
    <el-container class="viewer-header">
      <input class="edit-title"
             v-model="file.title"
             @blur="update" />
    </el-container>
    <el-container class="viewer-body">
      <textarea :disabled="!editable"
                :class="editable ? 'file-editor' : 'file-viewer'"
                v-model="file.body" />
      <ToolBar :setting="tools"
               class="viewer-tool" />
    </el-container>
  </el-container>
</template>

<script>
/**
 * 文档展示组件
 * 1、响应当前文件id改变，显示对应的文件内容
 */
import { updateFile } from "./index"
import ToolBar from "./ToolBar"
export default {
  components: {
    ToolBar
  },
  data () {
    return {
      editable: false,
      fileIndex: 0,
      tools: [
        {
          status: false,
          icon: ['el-icon-edit', 'el-icon-tickets'],
          title: ['编辑', '预览'],
          click: (e) => {
            e.status = !e.status
            this.toggleEditable()
          }
        },
        // {
        //   icon: ["el-icon-share"],
        //   title: ["分享"],
        //   click: (e) => {
        //     console.log("share")
        //   }
        // }
      ]
    }
  },
  computed: {
    file () {
      let file = this.$store.state.files[this.fileIndex]
      if (!file || file.foldered) {
        return null
      }
      file.body = file.body.replaceAll("[(br)]", "\n")
      return file;
    },
  },
  watch: {
    "$store.state.currentFileIndex": function (index) {
      this.fileIndex = index
    },
  },
  methods: {
    update () {
      let newObj = JSON.parse(JSON.stringify(this.file))
      newObj.body = newObj.body.replaceAll("\n", "[(br)]")
      updateFile(newObj, resp => {
        this.$message.success(resp.msg)
      }, resp => {
        this.$message.error(resp.msg)
      })
    },
    toggleEditable () {
      this.editable = !this.editable
      if (!this.editable) {
        this.update()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.viewer {
  display: flex;
  flex-direction: column;
}
.viewer-header {
  flex-grow: 0;
  padding: 20px;
  border-bottom: 1px solid #d4d4d4;
}

.viewer-body {
  display: flex;
  flex-direction: row;
}
.viewer-tool {
  width: 50px;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  text-align: center;
}
.title {
  font-size: 1rem;
}
input {
  font-size: 1rem;
  outline: none;
  border: 1px solid transparent;
}
textarea {
  resize: none;
  flex-grow: 1;
  outline: none;
  border: none;
  padding: 20px;
  height: 100%;
  width: 100%;
  &.file-editor {
    caret-color: #ffffff;
    color: #ffffff;
    background: #3a3333;
  }
  &.file-viewer {
    background: #ffffff;
    color: #3a3333;
    cursor: text;
  }
}
</style>
