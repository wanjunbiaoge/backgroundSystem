<template>
  <div>
    <el-dialog :title="info.isAdd ? '规格添加' : '规格编辑'" :visible.sync="info.isShow" width="30%" @close='empty'>
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
          <div class="attrInp">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
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
import { specsAdd, specsInfo, specsEdit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      specsReqChangeList: "specs/reqChangeList", //规格列表请求
      reqChangeTotal: "specs/reqChangeTotal", //总条数请求
    }),
    // 点击新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    // 点击删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    cancel() {
      this.info.isShow = false;
      this.info.isAdd = true
      this.empty();
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }, { value: "" }];
    },
    submit() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      specsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.specsReqChangeList(); //列表变了，重新请求数据
          this.reqChangeTotal(); //总数据条数
          this.cancel(); //清空
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getOne(id) {
      specsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form.id = id; //点击编辑的时候需要UID，FORM里面没有，所以这时候存一下
          this.form = res.data.list[0]; //赋值给表单
          // console.log('-----');
          // console.log(JSON.parse(this.form.attrs));
          this.attrArr = JSON.parse(this.form.attrs).map(item=>({value:item}))
        }
      });
    },
    edit() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      specsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.specsReqChangeList(); //重新请求列表数据
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.attrInp {
  display: flex;
}
</style>