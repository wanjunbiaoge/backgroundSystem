<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div>
            <img class="dd" :src="$imgUrl+scope.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rolename" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
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
            <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
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
import { goodsDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list", //列表数据
      total: "goods/total", //总条数
      size: "goods/size", //每页显示的条数
    }),
  },
  methods: {
    ...mapActions({
      goodsReqChangeList: "goods/reqChangeList", //请求列表数据
      goodsReqChangeTotal: "goods/reqChangeTotal", //请求总条数
      goodsReqChangePage: "goods/reqChangePage", //修改当前页码
    }),
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    
    del(id) {
      //删除
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.goodsReqChangeList(); //重新请求列表
              this.goodsReqChangeTotal(); //重新请求总数
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
    update(id) {
      this.$emit("update", id); //带参数通知父组件做更新事情
    },
    changePage(e) {
      //更改页数
      this.goodsReqChangePage(e), //修改当前页
        this.goodsReqChangeList(); //重新请求数据
    },
  },
  mounted() {
    this.goodsReqChangeList(); //页面一进来请求列表数据
    this.goodsReqChangeTotal(); //请求总数TOTAL
  },
};
</script>
<style scoped>
.dd{
  width: 100px;
}
</style>
