import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)

// 封装
function changeEnter(path, next) {
  // 取出你能去的地址
  let routerUrl = store.state.userInfo.menus_url
  if (routerUrl.includes(path)) {
    next()
  } else {
    next("/")
  }
}

export const indexRouter = [{
  path: "menu",
  name: "菜单管理",
  component: () => import("../page/menu/menu"),
  beforeEnter: (to, from, next) => {
    changeEnter("/menu", next)
  }
}, {
  path: "role",
  name: "角色管理",
  component: () => import("../page/role/role"),
  beforeEnter: (to, from, next) => {
    changeEnter("/role", next)
  }
}, {
  path: "manage",
  name: "管理员管理",
  component: () => import("../page/manage/manage"),
  beforeEnter: (to, from, next) => {
    changeEnter("/manage", next)
  }
}, {
  path: "cate",
  name: "商品分类",
  component: () => import("../page/cate/cate"),
  beforeEnter: (to, from, next) => {
    changeEnter("/cate", next)
  }
}, {
  path: "spec",
  name: "商品规格",
  component: () => import("../page/spec/spec"),
  beforeEnter: (to, from, next) => {
    changeEnter("/spec", next)
  }
}, {
  path: "goods",
  name: "商品管理",
  component: () => import("../page/goods/goods"),
  beforeEnter: (to, from, next) => {
    changeEnter("/goods", next)
  }
}, {
  path: "member",
  name: "会员管理",
  component: () => import("../page/member/member"),
  beforeEnter: (to, from, next) => {
    changeEnter("/member", next)
  }
}, {
  path: "banner",
  name: "轮播图管理",
  component: () => import("../page/banner/banner"),
  beforeEnter: (to, from, next) => {
    changeEnter("/banner", next)
  }
}, {
  path: "seckill",
  name: "秒杀活动",
  component: () => import("../page/seckill/seckill"),
  beforeEnter: (to, from, next) => {
    changeEnter("/seckill", next)
  }
}]


const router = new Router({
  routes: [{
      path: "/login",
      component: () => import('../page/login/login')
    },
    {
      path: "/",
      component: () => import("../page/index/index"),
      children: [{
          path: "",
          component: () => import("../page/home/home")
        },
        ...indexRouter
      ]
    }
  ]
})
// 登录拦截
router.beforeEach((to, from, next) => {
  // 1、如果去的是登录页，那么就直接进
  if (to.path == "/login") {
    next()
    return
  }
  // 2、如果去的是其他页面，就验证仓库里面的token是否存在，如果存在表示已经登陆过了可以放行
  if (store.state.userInfo.token) {
    next()
    return
  }
  next("/login")
})


export default router
