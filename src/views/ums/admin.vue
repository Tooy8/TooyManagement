<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template v-slot="scope">
        {{ formateDate(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后登录">
      <template v-slot="scope">
        {{ formateDate(scope.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用">
      <template v-slot="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="text" @click="allocRole(row.id)">分配角色</el-button>
        <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
  <EditRole :visible="RoleVisible" @close="closeRoleDialog" :form="roleData" />
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive } from "vue";
import { getAdminLists, getRoleListAll, getAdminRoleById } from "../../request/api";
import EditAdmin from "./components/EditAdmin.vue";
import EditRole from "./components/EditRole.vue";


interface AdminObjItd {
  username?: string
  nickName?: string
  email?: string
  password?: string
  note?: string
  status?: number
  id?: number

}

const state = reactive<{
  tableData: {}[];
  visible: boolean;
  rowData: AdminObjItd;
  RoleVisible: boolean;
  roleData: { roleLists: { name: string, id: number }[], userRoles: { name: string, id: number }[], adminId: number }
}>({
  tableData: [],
  visible: false,
  rowData: {},
  RoleVisible: false,
  roleData: {
    roleLists: [],
    userRoles: [],
    adminId: 0
  },

});
const { tableData, visible, rowData, RoleVisible, roleData } = toRefs(state);

//接收数据
const fetchData = () => {
  getAdminLists({
    keyword: "",
    pageSize: 10,
    pageNum: 1,
  }).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
    }
  });
}
fetchData()
//获取角色列表
getRoleListAll().then(res => {
  if (res.code == 200) {
    roleData.value.roleLists = res.data
  }
})

// 点击分配角色
const allocRole = (id: number) => {
  getAdminRoleById(id).then(res => {
    if (res.code == 200) {
      RoleVisible.value = true
      roleData.value.adminId = id
      roleData.value.userRoles = res.data
    }
  })


}


//隐藏分配角色弹框
const closeRoleDialog = () => {
  RoleVisible.value = false

}


//点击编辑按钮
const editAdmin = (row: {}) => {
  visible.value = true
  rowData.value = row
}
//隐藏弹框
const closeDialog = (r?: string) => {
  visible.value = false
  if (r == 'reload') {
    // 更新数据
    fetchData()
  }

}
// 格式化时间
const formateDate = (time: number | undefined) => {
  if (!time) return "";
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
};
</script>

<style lang="less" scoped></style>