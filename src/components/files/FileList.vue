<template>
  <el-container class="infinite-list"
                v-infinite-scroll="load"
                ref="listContainer"
                style="width: 301px, overflow: auto">
    <template v-for="(file, index) in files">
      <el-card :data-id="file.id"
               class="box-card"
               body-style="{ border: 'none' }"
               shadow="never"
               v-on:click.native="(e) => invoke(index)"
               :key="index">
        <p class="title">{{ file.title }}</p>
        <div class="brief">{{ file.body }}</div>
        <el-row v-if="!file.foldered">
          <el-col class="date">{{ file.created }}</el-col>
        </el-row>
      </el-card>
    </template>
  </el-container>
</template>

<script>
/**
 * 文件显示列表组件
 * 1、组件展示当前条件下的文档内容
 * 2、组件拥有无限滚动的功能
 * 3、组件在点击文档后，会通过vuex设置触发的文档id
 * 4、文件夹不显示创建时间
 */
import { initFileList, asyncFileList } from "./index"
export default {
  mounted () {
    initFileList()
    this.invoke(0)
  },
  computed: {
    files () {
      return this.$store.state.files
    },
  },
  data () {
    return {
      page: 1,
    };
  },
  methods: {
    invoke (index) {
      let list = this.$refs.listContainer.$children
      if (list && list.length > 0) {
        for (let file of list) {
          file.$el.classList.remove("active")
        }
        list[index].$el.classList.add("active")
      }
      this.$store.dispatch("notifyViewer", index)
    },
    load () {
      this.page++
    },
  },
  watch: {
    "$route.params.id": function (id) {
      if (id) {
        asyncFileList(id)
      } else {
        initFileList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  display: block;
  background: #f9f9f9;
  min-width: 301px;
  max-width: 301px;
  height: calc(100vh - 60px);
  border-right: 1px solid #0000002b;
  overflow: hidden;
  overflow-y: scroll;
  flex-grow: 0;
  .el-card {
    cursor: pointer;
    width: 300px;
    background: #f9f9f9;
    border: none;
    .title {
      font-size: 14px;
      font-weight: bold;
    }

    .brief {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .date {
      color: #a5a5a5;
      font-size: 12px;
    }

    :hover {
      background: #eae9e9;
    }
    &.active {
      background: #eae9e9;
    }
  }
}
</style>
