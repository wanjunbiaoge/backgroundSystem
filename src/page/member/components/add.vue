<template>
  <div>
    <el-dialog :title="info.isAdd?'添加':'编辑'" :visible.sync="info.isShow" width="30%" @close='empty'>
      <el-form :model="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="delivery">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { memberAdd, memberInfo, memberEdit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid:'',
        nickname: "",
        phone: "",
        password:'',
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      memberReqChangeList: "member/reqChangeList",
    }),
    empty() {
      this.form = {
        membername: "",
        members: "",
        status: 1,
      };
    },
    submit() {
      memberAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功的提示弹窗
          successAlert(res.data.msg);
          // 关闭当前页面
          this.info.isShow = false;
          this.empty();
          this.memberReqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    getOne(uid) {
      memberInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = ''
        }
      });
    },
    update() {
      memberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.empty();
          this.memberReqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.memberReqChangeList();
  },
};
</script>
<style scoped>
</style>