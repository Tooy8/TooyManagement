<template>
  <router-view></router-view>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive } from "vue";
</script>

<style lang="less" >
@import url("./assets/style/rebase.less");
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>