<!-- use version 0.20.1 -->


<script setup>
import {ElForm, ElFormItem, ElInput, ElButton, ElDatePicker} from "element-plus";
import {onMounted, ref} from "vue";
import axios from "axios";
import settings from '@/settings.json';
import * as XLSX from 'xlsx';
const serverURL = settings.serverURL;
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


const downloadExcel = async () => {
  // 将JSON数组转化为一个简单的对象数组
  const rows = DataResult.value.map(item => ({
	hash_id: item.hash_id,
	car_id: item.car_id,
	time: item.time,
	co2: item.co2,
	tvoc: item.tvoc,
	place: item.place
  }));

  // 生成工作表
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 创建一个新的工作簿并添加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  // 导出文件
  const wbout = XLSX.write(workbook, { bookType:'xlsx', type:'binary' });

  // 创建Blob对象，指定二进制字符串
  const blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});

  // 创建链接，模拟点击下载
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'DataResult.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 将字符串转换为字符流
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
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
  <el-container style = "display:flex;flex-direction: column">
	<el-table  :data="DataResult" border stripe :fit = "true">
	  <el-table-column prop = "car_id" label = "车辆ID"/>
	  <el-table-column prop = "co2" label = "CO2数据" />
	  <el-table-column prop = "tvoc" label = "TVOC数据" />
	  <el-table-column prop = "place" label = "地址" width />
	  <el-table-column prop = "time" label = "时间"/>
	</el-table>
	<el-button @click="downloadExcel" type="primary">导出Excel</el-button>
  </el-container>
</template>

<style scoped>

</style>