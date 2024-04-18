<script setup>
import CarInfo from "@/components/CarInfo.vue";
import settings from '@/settings.json'
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import {ref} from "vue"
const serverURL = settings.serverURL
const props = defineProps({
  CarId:String,
  CarIp:String,
  CO2:Number,
  TVOC:Number,
  Time:String,
})

function deletefunc(backendURL,CarId){
    let apiURL = backendURL + "/deleteCar" + "?CarId=" + CarId;
  	ElMessageBox.confirm(
		  '你确定要删除这辆车吗，删除后车辆将无法上传数据到服务器，现有数据将无法查询',
		'Warning',
		{
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning',
		}
	).then(()=>{
	  axios.delete(apiURL).then(()=>ElMessage({
		type: 'success',
		message: '删除成功',
	  })).catch((error)=>{
		ElMessage({
		  type: 'error',
		  message: '删除失败',
		})
	  })
	})
		.catch((error)=>{
		  ElMessage({
			type: 'info',
			message: '已取消删除',
		  })
		})
}
</script>

<template>
  <div class = car-info>
	<el-card
	  :body-style="{ padding: '10px' ,backgroundColor:'#7f7f7f'}"
	  :border-radius="10"
	  :shadow="hover"
  >
	  <car-info
	  :CarId="CarId"
	  :CarIp="CarIp"
	  :CO2 = "CO2"
	  :TVOC = "TVOC"
	  :Time = "Time"></car-info>

	<el-button plain @click="deletefunc(serverURL,CarId)">
	  点击删除该车辆
	</el-button>
	</el-card>
  </div>
</template>

<style scoped>
.car-info{
  display: grid;
  grid-gap: 16px;
}

</style>