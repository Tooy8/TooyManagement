<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="psw">
        <el-input v-model="ruleForm.psw" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="loginFn()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive } from "vue";
//引入接口
import { adminLoginApi, getAdminInfoApi } from "../../request/api";
//引入cookie库
import Cookie from "js-cookie";
//引入路由
import { useRouter } from "vue-router";
//引入仓库
import { MenusStore } from "../../store";

const state = reactive({
  ruleForm: {
    username: "admin",
    psw: "123456",
  },
});
let { ruleForm } = toRefs(state);
//获取from组件对象
let ruleFormRef = ref();
//获取当前路由对象
let router = useRouter();
//获取仓库
let menusStore = MenusStore();

//校验规则

const validatePsw = (
  rule: unknown,
  value: string | undefined,
  cb: (msg?: string) => {}
) => {
  if (!value) {
    cb("密码不能为空");
  } else {
    cb();
  }
};

const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  psw: [{ validator: validatePsw, trigger: "blur" }],
});

//登录按钮事件
const loginFn = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      console.log("校验通过");
      adminLoginApi({
        password: ruleForm.value.psw,
        username: ruleForm.value.username,
      }).then((res) => {
        if (res.code == 200) {
          // 存储token
          Cookie.set("token", res.data.tokenHead + res.data.token, {
            expires: 7,
          });
          //获取用户信息
          getAdminInfoApi().then((res) => {
            if (res.code == 200) {
              menusStore.menus = res.data.menus;
              //   console.log(menusStore.menus);
              // 跳转homepage页面
              router.push("/homepage");
            }
          });
        }
      });
    })
    .catch(() => {
      console.log("校验不通过");
    });
};
</script>

<style lang="less" scoped>
.login {
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>