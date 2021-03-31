<template>
  <div>
    <el-dialog :title="info.isAdd ? '菜单添加' : '菜单编辑'" :visible.sync="info.isShow" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择顶级菜单" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option v-for="item in indexRouter" :key="item.path" :label="item.name" :value="'/' + item.path">
            </el-option>
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
import { indexRouter } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { menuadd, menuInfo, menuedit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 用来渲染菜单地址
      indexRouter: indexRouter,
      // 用来渲染图标下拉框的
      icons: [
        "el-icon-s-help",
        "el-icon-message-solid",
        "el-icon-s-order",
        "el-icon-s-promotion",
        "el-icon-s-check",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
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
    handleClose() {
      this.empty();
      this.info.isShow = false;
    },
    // 点击取消
    cancel() {
      // 关闭add组件
      this.info.isShow = false;
      // 调用清空数据
      this.empty();
    },
    // 清空数据
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    submit() {
      menuadd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.empty();
          // 成功的提示
          successAlert(res.data.msg);
          // 重新请求数据，导致状态层的数据变了，所以list列表页变了
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 当上级菜单发生变化
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
        this.form.url = "";
      } else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    getOne(id) {
      menuInfo(id).then((res) => {
        console.log(this.list);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    edit() {
      menuedit(this.form).then((res) => {
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
</style>