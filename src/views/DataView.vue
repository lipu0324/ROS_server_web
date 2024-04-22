<script setup>
import {ElForm, ElFormItem, ElInput, ElButton, ElDatePicker} from "element-plus";
import {onMounted, ref} from "vue";
import axios from "axios";
import settings from '@/settings.json'
const serverURL = settings.serverURL
// 创建一个名为form 的ref数组
const form = ref({
  car_id:"",
  timeRange: ["",""],
  CarAddress: "",
})
const DataResult = ref([])
function onSubmit(form) {
	const data = {
	  "start_time" : form.timeRange[0],
	  "end_time" : form.timeRange[1],
	  "car_id" : form.car_id,
	  "CarAddress" : form.CarAddress,
	}
	axios.post(serverURL + "/api/get_history_data/", data).then(function (response) {
	  DataResult.value = response.data
	  console.log(DataResult.value)
	})
}

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
	<el-form-item label=位置>
	  <el-input v-model="form.CarAddress" placeholder="请输入位置"></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" @click="onSubmit(form)">查询</el-button>
	</el-form-item>
  </el-form>
  <el-container>
	<el-table  :data="DataResult" border stripe :fit = "true">
	  <el-table-column prop = "car_id" label = "车辆ID"/>
	  <el-table-column prop = "co2" label = "CO2数据" />
	  <el-table-column prop = "tvoc" label = "TVOC数据" />
	  <el-table-column prop = "place" label = "地址" width />
	  <el-table-column prop = "time" label = "时间"/>
	</el-table>
  </el-container>
</template>

<style scoped>

</style>