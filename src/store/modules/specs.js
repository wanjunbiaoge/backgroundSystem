import {
  specsList,
  specsTotal
} from '../../utils/request'
//存放数据
const state = {
  list: [], //列表
  total: 0, //总条数
  size: 10, //每页显示条数
  page: 1 //当前页码
}
//修改数据
const mutations = {
  changeList(state, arr) { //修改列表数据
    state.list = arr
  },
  changeTotal(state, num) { //修改总条数
    state.total = num
  },
  changePage(state, num) { //修改当前页码
    state.page = num
  }

}

const actions = {
  reqChangeList(context,bool) { //请求列表数据
    //传参，SIZE请求的条数，PAGE，页码
    let data = bool?{}:{size:context.state.size,page:context.state.page}
    specsList(data).then(res => {
      //解决BUG。当本页数据删除完了之后，
      let list = res.data.list ? res.data.list : []
      if (list.length == 0 && context.state.page > 1) {
        //如果本页没有数据勒，就去请求上一页的数据，
        context.commit('changePage', context.state.page - 1)
        // 然后调用自身，再执行一次
        context.dispatch('reqChangeList')
      }
      /* 
      list
        list[0] = {attrs,id,specsname,status}
        list[1] = {attrs,id,specsname,status}

        // 思路：先去掉attrs的外面引号
        // 处理之前的
        attrs = "["16""32""64""128""256"]"
        // 处理之后的
        attrs = ["16""32""64""128""256"]
      */
      list.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
      })
      // 修改列表数据
      context.commit('changeList', list)
    })
  },
  reqChangeTotal(context) { //请求总条数
    specsTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  // 触发修改当前页码
  reqChangePage(context, num) {
    context.commit('changePage', num)
  }
}
//导出数据
const getters = {
  list(state) { //列表数据
    return state.list
  },
  total(state) { //数据总条数
    return state.total
  },
  size(state) { //每页显示的条数
    return state.size
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced: true
}
