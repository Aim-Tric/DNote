<template>
  <el-container ref="minimenu"
                :style="{
      position: 'absolute',
      top: top + 'px',
      left: left + 'px',
      display: visible ? 'block' : 'none',
      padding: '2px',
    }">
    <Menu>
      <template v-for="(m, i) in menu">
        <template v-if="m.subMenu && m.subMenu.length > 0">
          <SubMenu :key="i"
                   :name="m.title">
            <template v-for="(s, j) in m.subMenu">
              <MenuItem :key="j"
                        :callback="e => {callbackWrapper(e, s.callback);}">{{ s.title }}</MenuItem>
            </template>
          </SubMenu>
        </template>
        <template v-else-if="m.condition(hasTarget)">
          <MenuItem :key="i"
                    :callback="e => {callbackWrapper(e, m.callback);}">{{ m.title }}</MenuItem>
        </template>
      </template>
    </Menu>
  </el-container>
</template>

<script>
/**
 * 右键小菜单组件
 */
import Menu from "./Menu";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
export default {
  props: ["menu"],
  components: {
    Menu,
    SubMenu,
    MenuItem,
  },
  data () {
    return {
      top: 0,
      left: 0,
      hasTarget: false,
    };
  },
  computed: {
    visible () {
      return this.$store.state.visible;
    },
  },
  mounted () {
    let self = this;
    this.$parent.$el.addEventListener("contextmenu", this.openMenu);
    // 右键菜单取消函数
    window.addEventListener("click", function (e) {
      if (self.isOutOfBound(e)) {
        self.$store.dispatch("setContextMenuVisibility", false);
        self.$store.dispatch("clearTarget");
      }
    });
  },
  methods: {
    // 右键菜单触发函数
    openMenu (e) {
      this.top = e.clientY;
      this.left = e.clientX;
      if (!this.isOutOfBound(e)) {
        // 循环右键点击的dom节点，判断是否点击在某个文档上
        for (let elem of e.path) {
          // 在某个文档下则将目标设置为该文档的数据
          if (elem.classList && elem.classList.contains("el-card")) {
            this.$store.dispatch("setTarget", elem.getAttribute("data-id"));
            this.hasTarget = true;
            break;
          } else {
            this.hasTarget = false;
          }
        }
        e.preventDefault();
        this.$store.dispatch("setContextMenuVisibility", true);
      } else {
        this.$store.dispatch("setContextMenuVisibility", false);
      }
      return false;
    },
    // 判断点击事件位置是否超出了右键菜单的边界
    isOutOfBound (e) {
      if (this.$refs.minimenu) {
        let popover = this.$refs.minimenu.$el;
        return !(
          e.clientX >= this.left &&
          e.clientX <= this.left + popover.offsetWidth &&
          e.clientY >= this.top &&
          e.clientY <= this.top + popover.offsetHeight
        );
      }
      return false;
    },
    callbackWrapper (e, callback) {
      callback(e)
      this.$store.dispatch("setContextMenuVisibility", false)
    }
  },
};
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
</style>