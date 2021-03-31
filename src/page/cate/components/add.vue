<template>
  <div>
    <el-dialog :title="info.isAdd ? '商品添加' : '商品编辑'" :visible.sync="info.isShow" width="30%" @close='cancel'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl">
            <input type="file" @change="changeFile" v-if="info.isShow">
          </div>
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
import { indexRouter } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { cateAdd, cateInfo, cateEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //渲染图片路径
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    changeFile(e) {
      let file = e.target.files[0];
      // 限制大小file.size      限制大小为2M   1024B-->1Kb    1024Kb-->1M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      // URL.createObjectURL()    可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    
    // 点击取消
    cancel() {
      // 关闭add组件
      this.info.isShow = false;
      this.imgUrl = ''
      // 调用清空数据
      this.empty();
    },
    // 清空数据
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
    },
    submit() {
      console.log(this.form);
      cateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.cancel()
          // 成功的提示
          successAlert(res.data.msg);
          // 重新请求数据，导致状态层的数据变了，所以list列表页变了
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    
    getOne(id) {
      cateInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 给图片设置路径 。因为后端直接返回的是文件夹下面的路径，所以需要处理一下，前面拼接上http://localhost:3000
          this.imgUrl = this.$imgUrl + this.form.img;
          this.form.id = id;
        }
      });
    },
    edit() {
      cateEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isShow = false;
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
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