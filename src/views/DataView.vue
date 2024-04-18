<script setup>
import {ElForm, ElFormItem, ElInput, ElButton, ElDatePicker} from "element-plus";
</script>

<template>
  <el-form :model="form" label-width="80px" @submit.prevent="onSubmit">
	<el-form-item label="车辆ID">
	  <el-input v-model="form.car_id" placeholder="请输入车辆ID"></el-input>
	</el-form-item>
	<el-form-item label="时间区间">
	  <el-date-picker v-model="form.timeRange"
					  type="datetimerange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
	  ></el-date-picker>
	</el-form-item>
	<el-form-item label=”位置”>
	  <el-input v-model="form.CarAddress" placeholder="请输入位置"></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" @click="onSubmit">查询</el-button>
	</el-form-item>
  </el-form>
</template>

<style scoped>

</style>