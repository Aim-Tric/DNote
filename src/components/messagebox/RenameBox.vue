<template>
  <el-form :inline="true"
           :model="formData.file">
    <el-form-item label="文档名">
      <el-input v-model="formData.file.title"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["formData"]
}
</script>

<style lang="scss" scoped>
</style>