<template>
  <el-form :model="formData"
           :inline="true">
    <el-form-item label="分享链接">
      <el-input v-model="formData.link"
                disabled></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["formData"]
}
</script>
