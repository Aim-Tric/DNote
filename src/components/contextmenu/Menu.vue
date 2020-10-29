<template>
  <el-container>
    <ul class="menu">
      <slot></slot>
    </ul>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  background: #eee;
}
.menu li {
  list-style: none;
  background: #eee;
}
.el-button {
  width: 100%;
  border: none;
}
</style>