<template>
  <el-container>
    <FileList></FileList>
    <FileViewer></FileViewer>
  </el-container>
</template>

<script>
import FileList from "./FileList";
import FileViewer from "./FileViewer";
export default {
  components: {
    FileList,
    FileViewer,
  },
};
</script>

<style lang="scss" scoped>
</style>
