<script setup>
import myHeader from "@/components/myHeader.vue";
import asideNav from "@/components/asideNav.vue";
</script>

<template>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <div class="app">
	<!-- 头部 -->
	<myHeader></myHeader>
	<el-container style="height: 100vh;
      border:0px soild #eee;
      margin: 0;
      padding: 0;
      border:0;">
	  <!-- 侧边栏 -->
	  <el-aside width="11%">
		<asideNav></asideNav>
	  </el-aside>
	  <!-- 主体内容 -->
	  <router-view></router-view>
	</el-container>
  </div>
</template>

<style scoped>

</style>