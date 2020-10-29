<template>
  <el-container ref="menu" class="sub-menu">
    <el-button size="mini" ref="btn">{{ name }}</el-button>
    <el-container
      ref="sub"
      class="sub"
      :style="{ left: x + 'px', display: visible ? 'block' : 'none' }"
    >
      <slot></slot>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
  mounted() {
    let eventName = "mouseover";
    let outName = "mouseout";
    let btn = this.$refs.btn.$el;
    let menu = this.$refs.menu;
    btn.addEventListener(eventName, (e) => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let btnWidth = menu.$el.offsetWidth;
      this.visible = true;
      this.x = btnWidth;
    });
    btn.addEventListener(outName, (e) => {
      this.autoDisapear();
      this.$refs.sub.$el.addEventListener(eventName, (e) => {
        clearTimeout(this.timer);
        this.visible = true;
      });
      this.$refs.sub.$el.addEventListener(outName, this.autoDisapear);
    });
  },
  data() {
    return {
      x: 0,
      visible: false,
    };
  },
  methods: {
    autoDisapear() {
      this.timer = setTimeout(() => (this.visible = false), 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
  border: none;
  background: #eee;
}
.sub-menu {
  position: relative;
}

.sub {
  position: absolute;
}
</style>