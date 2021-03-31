<template>
  <div>
    <el-dialog :title="info.isAdd ? '轮播图添加' : '轮播图编辑'" :visible.sync="info.isShow" width="40%" @close='cancel'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker type="datetimerange" v-model="value" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类" @change='changeSecond'>
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in secondArr" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  cateList,
  goodsList,
  seckAdd,
  seckInfo,
  seckEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      // 用于渲染二级分类
      secondArr: [],
      // 用于渲染商品ID
      goodsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      // cate列表数据
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      // goods列表请求
      reqGoodsList: "goods/reqChangeList",
      // cate列表请求
      reqCateList: "cate/reqChangeList",
      reqChangeList: "seckill/reqChangeList",
    }),
    changeFirst() {
      cateList({
        pid: this.form.first_cateid,
      }).then((res) => {
        // 清空form里面的second_cateid
        this.form.second_cateid = "";
        this.form.goodsid = "";
        this.secondArr = res.data.list;
      });
    },
    changeSecond() {
      goodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.form.goodsid = "";
        this.goodsArr = res.data.list;
      });
    },
    // 点击取消
    cancel() {
      // 关闭add组件
      this.info.isShow = false;
      this.imgUrl = "";
      // 调用清空数据
      this.empty();
      this.value = [];
    },
    // 清空数据
    empty() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
    },
    submit() {
      this.form.begintime = new Date(this.value[0]).getTime();
      this.form.endtime = new Date(this.value[1]).getTime();
      seckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.cancel();
          // 成功的提示
          successAlert(res.data.msg);
          // 重新请求数据，导致状态层的数据变了，所以list列表页变了
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
        this.value = [];
      });
    },

    getOne(id) {
      seckInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          cateList({ pid: this.form.first_cateid }).then((res) => {
            this.secondArr = res.data.list;
          });
          goodsList({
            fid: this.form.first_cateid,
            sid: this.form.second_cateid,
          }).then((res) => {
            this.goodsArr = res.data.list;
          });
          // 给图片设置路径 。因为后端直接返回的是文件夹下面的路径，所以需要处理一下，前面拼接上http://localhost:3000
          this.imgUrl = this.$imgUrl + this.form.img;
          this.form.id = id;
          this.value = [
            Number(res.data.list.begintime),
            Number(res.data.list.endtime),
          ];
        }
      });
    },
    edit() {
      seckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isShow = false;
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
      this.value = [];
    },
  },
  mounted() {
    this.reqCateList(), this.reqGoodsList();
  },
};
</script>
<style scoped>
.fileBox {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px dashed red;
  background-color: skyblue;
}
.fileBox input {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
  opacity: 0;
}
.fileBox h3 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
  margin: 0;
}
.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>