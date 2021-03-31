<template>
  <div>
    <el-container class="wrap">
      <el-aside width="200px" class="left">
        <el-row>
          <el-col>
            <!-- 
              default-active 当前激活的菜单
              background-color 菜单背景颜色
              text-color  文字颜色
              active-text-color 当前选中的菜单文字颜色
             -->
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="rgb(21,23,31)" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
              <el-menu-item index="/">
                <i class="el-icon-location"></i>
                <span>首页</span>
              </el-menu-item>

              <div v-for="item in userInfo.menus" :key="item.id">
                <!-- 目录 -->
                <el-submenu :index="item.id+''" v-if="item.children">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">
                      <span>{{i.title}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!-- 菜单 -->
                <el-menu-item :index="item.url" v-else>
                  <span>{{item.title}}</span>
                </el-menu-item>
              </div>

            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header class="top">
          <div>
            <span>{{userInfo.username}}</span>
            <el-button @click="logOut">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 设置面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="marginBottom">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 点击退出
    logOut() {
      //1、清空本地存储的userinfo
      this.reqUserInfo({});
      //2、退出成功的弹窗
      successAlert("退出成功");
      //3、跳到登录页
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
}

.left {
  background: rgb(21, 23, 31);
}

.top {
  background: rgb(181, 194, 211);
}

.marginBottom {
  margin-bottom: 20px;
}
.top div {
  float: right;
  margin-right: 50px;
}
</style>
