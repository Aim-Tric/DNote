<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span>登录</span>
    </div>
    <el-form v-loading="loading"
             :model="loginForm"
             status-icon
             :rules="rules"
             ref="loginForm"
             label-width="100px">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model.number="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="loginForm.password"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="goRegister">还没有账号，去注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { login } from "@/service/UserService"
export default {
  mounted () {
    window.addEventListener('keydown', this.keyDownLogin)
  },
  data () {
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let vm = this;
          setTimeout(function () {
            login(vm.loginForm, (msg) => {
              vm.$message({
                message: msg,
                type: "success",
              });
              setTimeout(function () {
                vm.$router.push("files");
              }, 500);
            }, error => {
              vm.loading = false;
              vm.$message({
                message: error,
                type: "error"
              })
            })
          }, 500);
        } else {
          return false;
        }
      });
    },
    goRegister () {
      this.$router.push("register")
    },
    keyDownLogin (e) {
      if (e.keyCode == 13) {
        this.submitForm('loginForm')
      }
    }
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDownLogin, false);
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 40%;
  padding-right: 40px;
  position: absolute;
  right: 10%;
  top: 20%;
}
</style>
