import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

//开发环境
let baseUrl = '/api'
Vue.prototype.$imgUrl = "http://localhost:3000/"

//上线环境
// let baseUrl = ''
// Vue.prototype.$imgUrl = ''


//响应拦截
axios.interceptors.response.use((res) => {
  console.group('======本次请求路径是' + res.config.url)
  console.log(res);
  console.groupEnd('======请求结束')

  return res
})
// ==========menu菜单管理=============

export const menuadd = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}
export const menuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  })
}
export const menuInfo = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
export const menuedit = (form) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  })
}
export const menuDel = (form) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify(form)
  })
}

// ==========角色管理=============
export const roleAdd = (form) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(form)
  })
}

export const roleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  })
}
export const roleDel = (form) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify(form)
  })
}
export const roleInfo = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
export const roleEdit = (form) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(form)
  })
}

// ==========管理员管理=============
//添加
export const manageAdd = (form) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(form)
  })
}
//总数
export const manageTotal = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get",
  })
}
//列表
export const manageList = (form) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: form
  })
}
//获取一条信息
export const manageInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}
//编辑
export const manageEdit = (form) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(form)
  })
}
//删除
export const manageDel = (form) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(form)
  })
}

// ==========cate商品分类=============
// 添加
export const cateAdd = (form) => {
  // 因为form中包含了文件，所以必须要模拟form表单进行传参
  /* 
    form={
      pid:0,
      catename:"空调",
      img:文件,
      status:1
    }
      data.append("pid",0)
      data.append("catename","空调")
      data.append("img","文件")
      data.append("status",1)
  */
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}
// 列表
export const cateList = (form) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: form
  })
}
// 删除
export const cateDel = (form) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const cateInfo = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const cateEdit = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}

// ==========商品规格管理=============
//添加
// 添加
export const specsAdd = (form) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 列表
export const specsList = (form) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: form
  })
}
// 删除
export const specsDel = (form) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const specsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const specsEdit = (form) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 总条数
export const specsTotal = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  })
}

// ==========goods商品管理=============
// 添加
export const goodsAdd = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 列表
export const goodsList = (form) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: form
  })
}
// 删除
export const goodsDel = (form) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const goodsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const goodsEdit = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}
// 总条数
export const goodsTotal = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  })
}

// ==========login管理员登录=============
export const reqLogin = (form) => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(form)
  })
}

// ===========轮播图管理=================
// 添加
export const bannerAdd = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  })
}
//列表
export const bannerList = (form) => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get"
  })
}
//获取一条信息
export const bannerInfo = (form) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: form
  })
}
//修改
export const bannerEdit = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  })
}
//删除
export const bannerDel = (form) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify(form)
  })
}

//===========限时秒杀活动========
// 添加
export const seckAdd = (form) => {
  return axios({
    url: baseUrl + "/api/seckadd",
    method: "POST",
    data: qs.stringify(form)
  })
}
//列表
export const seckList = (form) => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get"
  })
}
//获取一条信息
export const seckInfo = (id) => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params:{
      id:id
    }
  })
}
//修改
export const seckEdit = (form) => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(form)
  })
}
//删除
export const seckDel = (form) => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify(form)
  })
}

// ============会员管理=========
// 列表
export const memberList = (form) => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get"
  })
}
//获取一条信息
export const memberInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params:{
      uid:uid
    }
  })
}
//修改
export const memberEdit = (form) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(form)
  })
}
//注册
export const memberAdd = (form) => {
  return axios({
    url: baseUrl + "/api/register",
    method: "post",
    data: qs.stringify(form)
  })
}