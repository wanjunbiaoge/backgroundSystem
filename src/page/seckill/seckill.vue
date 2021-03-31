<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @update="update"></v-list>
    <v-add :info='info' ref="aa"></v-add>

  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vList,
    vAdd,
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
      this.info.isAdd = true;
    },
    update(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // 通过ref让add组件执行他的getOne()
      this.$refs.aa.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
