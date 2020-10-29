<template>
  <li>
    <el-button
      size="mini"
      @click="
        (e) => {
          callback(e, context);
        }
      "
    >
      <slot></slot>
    </el-button>
  </li>
</template>

<script>
export default {
  props: ["callback", "context"],
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
  border: none;
  background: #eee;
}
</style>