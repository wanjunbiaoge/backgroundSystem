<template>
  <div>
    <el-dialog :title="info.isAdd ? '用户添加' : '用户编辑'" :visible.sync="info.isShow" width="30%" @close='empty'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择所属角色">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="submit">添加</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { manageAdd, manageInfo, manageEdit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",//渲染角色管理列表
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",//角色管理请求
      manageReqChangeList: "manage/reqChangeList",//管理员列表请求
      reqChangeTotal: "manage/reqChangeTotal"//总条数请求
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
    submit() {
      manageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.manageReqChangeList();//列表变了，重新请求数据
          this.reqChangeTotal();//总数据条数
          this.cancel();//清空
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getOne(uid) {
      manageInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;//赋值给表单
          this.form.password = "";//不展示密码
          this.form.uid = uid;//点击编辑的时候需要UID，FORM里面没有，所以这时候存一下
        }
      });
    },
    edit() {
      manageEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.manageReqChangeList(); //重新请求列表数据
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();//请求角色管理的数据
  },
};
</script>
<style scoped>
</style>