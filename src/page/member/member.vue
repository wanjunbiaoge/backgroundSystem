<template>
  <div>
    <h3>角色管理</h3>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='obj' ref="aaa"></v-add>
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
      obj: {
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
      this.obj.isShow = true;
    },
    update(uid) {
      this.obj.isShow = true;
      this.obj.isAdd = false;
      this.$refs.aaa.getOne(uid);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
