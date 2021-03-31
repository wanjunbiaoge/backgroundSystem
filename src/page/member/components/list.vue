<template>
  <div>
    <el-table :data="memberList" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.uid)">编 辑</el-button>
            <!-- <el-button type="danger" @click="del(scope.row.id)">删 除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
// import { memberDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "member/reqChangeList",
    }),
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          memberDel({
            id: id,
          }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqChangeList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update(uid) {
      console.log(uid);
        this.$emit('update',uid)
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>