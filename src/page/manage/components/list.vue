<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="用户编号">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.uid)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
       total  总条数
       page-size   每页展示多少条
       @current-change  当页码发生变化
     -->
    <el-pagination background layout="prev, pager, next" :total='total' :page-size='size' @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { manageDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",//列表数据
      total:'manage/total',//总条数
      size: 'manage/size'//每页显示的条数
    }),
  },
  methods: {
    ...mapActions({
      manageReqChangeList: "manage/reqChangeList",//请求列表数据
      manageReqChangeTotal: 'manage/reqChangeTotal',//请求总条数
      manageReqChangePage:'manage/reqChangePage'//修改当前页码
    }),
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    del(uid) { //删除
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        manageDel({ uid: uid }).then((res) => {
          if(res.data.code == 200 ){
            successAlert(res.data.msg)
            this.manageReqChangeList()//重新请求列表
            this.manageReqChangeTotal()//重新请求总数
          }else{
            warningAlert(res.data.msg)
          }
        });
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });;
    },
    update(uid){
      this.$emit('update',uid)//带参数通知父组件做更新事情
    },
    changePage(e){//更改页数
      this.manageReqChangePage(e),//修改当前页
      this.manageReqChangeList();//重新请求数据
    }
  },
  mounted() {
    this.manageReqChangeList();//页面一进来请求列表数据
    this.manageReqChangeTotal();//请求总数TOTAL
  },
};
</script>
<style scoped>
</style>
