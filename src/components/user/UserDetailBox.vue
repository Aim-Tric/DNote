<template>
  <el-container>
    <el-form ref="form"
             :model="form"
             label-width="80px"
             size="mini">
      <el-form-item label="编辑">
        <el-switch v-model="form.editable"></el-switch>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.user.username"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.user.nickName"
                  :disabled="!form.editable"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  props: ['form'],
}
</script>