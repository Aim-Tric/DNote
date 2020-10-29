<template>
  <el-container class="sider-tool">
    <template v-for="(tool, index) in setting">
      <a v-if="typeof tool.status == 'boolean'"
         class="tool-btn"
         :key="index"
         @click.prevent="tool.click(tool)"
         :title="tool.status ? tool.title[0] : tool.title[1]">
        <i :class="tool.status ? tool.icon[0] : tool.icon[1]"></i>
      </a>
      <a v-else
         :key="index"
         class="tool-btn"
         @click.prevent="tool.click(tool)"
         :title="tool.title">
        <i :class="tool.icon"></i>
      </a>
    </template>
  </el-container>
</template>

<script>
export default {
  props: ["setting"]
}
</script>

<style lang="scss">
.tool-btn {
  padding: 12px;
}
</style>