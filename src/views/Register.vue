<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span>注册</span>
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
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="loginForm.checkPass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input type="text"
                  v-model="loginForm.phone"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称"
                    prop="nickName">
        <el-input type="text"
                  v-model="loginForm.nickName"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="goLogin">已经有账号了，去登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  register
} from "@/service/UserService"
export default {
  mounted () {
    const vm = this
    window.addEventListener('keydown', this.keyDownRegister)
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
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        return callback(new Error("两次输入的密码不匹配"));
      }
      callback();
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入手机号"));
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
        return callback(new Error("输入的手机号码有误"));
      }
      callback();
    }
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
        checkPass: "",
        phone: "",
        nickName: "",
      },
      rules: {
        phone: [{
          validator: validatePhone,
          trigger: "blur"
        }],
        checkPass: [{
          validator: checkPass,
          trigger: "blur"
        }],
        password: [{
          validator: validatePass,
          trigger: "blur"
        }],
        username: [{
          validator: checkUsername,
          trigger: "blur"
        }],
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let vm = this;
          setTimeout(function () {
            register(vm.loginForm, (msg) => {
              vm.$message({
                message: msg,
                type: "success",
              });
              setTimeout(function () {
                vm.$router.push('/login')
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
    goLogin (e) {
      this.$router.push('/login')
    },
    keyDownRegister (e) {
      if (e.keyCode == 13) {
        thi.submitForm('loginForm')
      }
    }
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDownRegister, false);
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
