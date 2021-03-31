<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='info' ref="aaa"></v-add>
    <v-list @update='update'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info.isShow = true;
    },
    //list列表点击勒编辑之后，通知我要执行的事情
    update(uid){
      this.info.isShow = true
      this.info.isAdd = false
      // 通过ref让add组件执行他的getOne
      this.$refs.aaa.getOne(uid)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
