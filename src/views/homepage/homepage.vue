<template>
  <div class="homepage_container">
    <div class="homepage_header">
      <h1>电商后台管理</h1>
    </div>
    <div class="homepage_menu">
      <el-menu active-text-color="#ffd04b" background-color=" rgb(47, 65, 86)" class="el-menu-vertical-demo"
        default-active="2" text-color="#fff" :unique-opened="true" :router="true">


        <el-menu-item index="/index">
          <span>首页</span>
        </el-menu-item>


        <el-sub-menu :index="menu.id + ''" v-for="menu in newMenus" :key="menu.id">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="subMenu in menu.children">
            <el-menu-item :index="'/' + menu.name + '/' + subMenu.name" v-if="!subMenu.hidden" :key="subMenu.id">{{
              subMenu.title }}</el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="homepage_content"><router-view></router-view></div>
  </div>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive } from "vue";
//引入库
import { MenusStore } from "../../store";
//获取菜单数据
const menusStore = MenusStore();
const newMenus = menusStore.getNewMenus;
</script>

<style lang="less" scoped>
body {
  display: inline-block;
}

.homepage_container {
  position: relative;
  height: 100%;

  .homepage_header {
    height: 70px;
    background-color: rgb(56, 156, 255);

    h1 {
      line-height: 70px;
      margin-left: 40px;
      font-size: 30px;
      font-weight: 400;
      color: #eee;
    }
  }

  .homepage_menu {
    position: absolute;
    top: 70px;
    left: 0px;
    bottom: 0px;
    width: 250px;
    background-color: rgb(47, 65, 86);
  }

  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0px;
    left: 250px;
    bottom: 0px;
    background-color: #eee;
  }
}
</style>