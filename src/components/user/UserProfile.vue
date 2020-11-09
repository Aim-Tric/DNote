<template>
  <el-container>
    <el-popover ref="popover"
                @show="onShow"
                placement="bottom"
                width="200"
                trigger="click">
      <el-container class="user-profile-wrapper">
        <el-container class="info">
          <el-avatar :size="80"
                     src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
          </el-avatar>
          <span>{{ user ? user.nickName : "用户" }}</span>
        </el-container>
        <el-container class="button-group">
          <el-container class="button">
            <el-button @click="openDetialBox">个人信息</el-button>
          </el-container>
          <el-container class="button">
            <el-button @click="doLogout">退出登录</el-button>
          </el-container>
        </el-container>
        <el-container class="use-info">

        </el-container>
      </el-container>
      <el-button slot="reference"
                 circle
                 icon="el-icon-user-solid"></el-button>
    </el-popover>
  </el-container>
</template>

<script>
import { logout, updateUserInfo } from "./index"
import UserDetailBox from "./UserDetailBox"
export default {
  mounted () {
  },
  data () {
    return {
      deltaTime: null,
      form: {
        editable: false
      }
    };
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onShow () {
      let ele = this.$refs.popover.popperElm;
      if (!ele.classList.contains("user-profile-popover")) {
        ele.classList.add("user-profile-popover")
      }
      let now = new Date()
      if (this.deltaTime) {
        // TODO 重新加载用户数据
      } else {
        this.deltaTime = new Date()
      }
    },
    doLogout () {
      logout()
    },
    openDetialBox () {
      const h = this.$createElement
      this.form.user = this.user
      this.$msgbox({
        title: '个人详细',
        message: h(UserDetailBox, {
          props: {
            form: this.form
          }
        }),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(action => {
        this.form.editable = false
        updateUserInfo(resp => {
          this.$message.success(resp.msg)
        }, error => {
          this.$message.error(error)
        })
      }).catch(error => {
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-profile-wrapper {
  display: flex;
  flex-direction: column;
  .info {
    display: flex;
    flex-direction: column;
    text-align: center;
    span {
      padding: 4px 0;
    }
  }
  .el-avatar {
    margin: auto;
  }
  .button-group {
    margin-top: 6px;
  }
  .button .el-button {
    width: 100%;
    border: none;
    padding: 8px 20px;
  }
}
</style>
