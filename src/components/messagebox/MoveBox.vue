<template>
  <el-form :inline="true"
           :model="formData">
    <el-form-item label="移动到">
      <el-select v-model="formData.file.folderId">
        <el-option v-for="(folder, index) in formData.folders"
                   :key="index"
                   :label="folder.title"
                   :value="folder.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["formData"],
}
</script>