<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="菜单编号">
      </el-table-column>
      <el-table-column prop="title" label=" 菜单名称">
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1" @click="scope.row.status= !scope.row.status">启 用</el-button>
          <el-button type="info" v-else @click="scope.row.status= !scope.row.status">禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { menuDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
    }),
    update(id) {
      // 去通知父级做某些事
      this.$emit("update", id);
    },
    useful(){
      this.scope.row.status = !this.scope.row.status
    },
    del(id) {
      menuDel({id:id}).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.reqChangeList()
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>