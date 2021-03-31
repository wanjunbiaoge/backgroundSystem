<template>
  <div class="login">
    <div class="box">
      <h3 class="center">登录</h3>
      <div>
        <div class="marginBottom">
          <el-input placeholder="请输入内容" v-model="form.username" clearable></el-input>
        </div>
        <div class="marginBottom">
          <el-input placeholder="请输入密码" v-model="form.password" clearable show-password></el-input>
        </div>
        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      reqUserInfo: "reqUserInfo",
    }),
    login() {
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          // 1、成功的弹窗
          successAlert(res.data.msg);
          // 2、存入状态层
          this.reqUserInfo(res.data.list);
          // 3、跳入页面
          this.$router.push("/");
        } else {
          // 失败的弹窗
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgb(74, 41, 55), rgb(37, 51, 85));
}

.box {
  width: 430px;
  height: 260px;
  background: white;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center {
  text-align: center;
}

.marginBottom {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
