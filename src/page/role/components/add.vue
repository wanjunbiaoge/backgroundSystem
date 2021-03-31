<template>
  <div>
    <el-dialog :title="info.isAdd?'添加角色':'编辑角色'" :visible.sync="info.isShow" width="30%" @close='empty'>
      <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <!-- 
          data要展示的数据
          node-key唯一标识
          :default-expanded-keys默认展开的
          default-checked-keys默认选中的
         -->
        <el-form-item label="角色权限" prop="region">
          <el-tree ref="tree" :data="menuList" show-checkbox node-key="id" :props="{label:'title',children: 'children'}">
          </el-tree>
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
import { roleAdd, roleInfo, roleEdit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      menuReqChangeList: "menu/reqChangeList",
      roleReqChangeList: "role/reqChangeList",
    }),
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 由于树形控件和form没有任何联系，所以要是用element的方法来清空
        this.$refs.tree.setCheckedKeys([])
    },
    submit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form);
      roleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功的提示弹窗
          successAlert(res.data.msg);
          // 关闭当前页面
          this.info.isShow = false;
          this.empty();
          this.roleReqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    getOne(id) {
      roleInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 因为一会点击编辑的时候需要id这个字段，但是form里没有，所以我们在获取一条信息的时候就把id添加到form中
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleEdit(this.form).then(res=>{
          if(res.data.code == 200){
              successAlert(res.data.msg)
              this.info.isShow = false
              this.empty()
              this.roleReqChangeList()
          }else{
              warningAlert(res.data.msg)
          }
      })
    },
  },
  mounted() {
    this.menuReqChangeList();
  },
};
</script>
<style scoped>
</style>