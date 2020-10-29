<template>
  <el-container class="main-container">
    <el-header>
      <router-link to="/">
        <h3 class="logo">DNote</h3>
      </router-link>
      <div class="search-bar">
        <el-input placeholder="请输入内容"
                  v-model="searchWords"
                  class="input-with-select">
          <el-button slot="append"
                     icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="user-profile">
        <UserProfile></UserProfile>
      </div>
    </el-header>
    <el-container ref="menuarea">
      <el-aside width="200px">
        <el-menu default-active="/files"
                 router>
          <el-menu-item index="/files"
                        @click.native="toLatest">
            <i class="el-icon-menu"></i>
            <span slot="title">最新文档</span>
          </el-menu-item>
          <el-submenu index="2"
                      @click.native="toFolders">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的文件夹</span>
            </template>
            <template v-for="(folder, index) in folders">
              <el-menu-item-group :key="index">
                <el-menu-item :index="'/files/' + folder.id">
                  {{ folder.title }}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
          <el-menu-item index="/recycle">
            <i class="el-icon-menu"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view></router-view>
        <MiniMenu :menu="menu" />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { initSider, initFileList } from "./index"
import { menu } from "@/config/setting.js";
import UserProfile from "@/components/user/UserProfile";
import MiniMenu from "@/components/contextmenu/MiniMenu";
export default {
  components: {
    UserProfile,
    MiniMenu,
  },
  mounted () {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    initSider()
  },
  data () {
    return {
      searchWords: "",
      menu,
    };
  },
  computed: {
    folders () {
      return this.$store.state.folders;
    }
  },
  methods: {
    toFolders () {
      this.$store.dispatch("setFiles", this.$store.state.folders);
    },
    toLatest () {
      initFileList()
    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - 60px);
}
.el-header {
  box-shadow: 0px 1px 3px 0px #00000033;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
a {
  display: block;
  text-decoration: none;
  width: 160px;
  .logo {
    width: 160px;
    text-align: center;
    padding: 17px 20px;
    color: #000;
  }
}

.search-bar,
.user-profile {
  padding: 10px;
}

.search-bar {
  width: 30%;
}

.main-container {
  max-height: calc(100vh - 60px);
}
</style>
