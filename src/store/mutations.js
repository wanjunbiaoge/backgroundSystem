export const state = {
  // 小bug，因为状态层一刷新数据就没了，判断如果本地存储中有那么就拿过来，如果没有再设置成空{}
  userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
}
export const mutations = {
  changeUserInfo(state, info) {
    // 修改状态层userInfo
    state.userInfo = info

    if (info.token) {
      // 如果info有值就要设置本地存储
      // 因为状态层一刷新数据就没了，导致userInfo信息就是空的了，所以我们在这里本地存储
      sessionStorage.setItem("userInfo", JSON.stringify(info))
    } else {
      // 如果info没有值就要清空本地存储
      // 这里说明info是一个空对象
      sessionStorage.removeItem("userInfo")
    }
  }
}
export const getters = {
  userInfo(state) {
    return state.userInfo
  }
}
