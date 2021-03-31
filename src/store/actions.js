const actions = {
  reqUserInfo(context,info){
    context.commit('changeUserInfo',info)
  }
}
export default actions
