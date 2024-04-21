<script setup>
import {onMounted,ref} from "vue";
import{ElMessage} from "element-plus";
import axios from "axios";
import CarSetting from '@/components/CarSetting.vue'
import  settings from '@/settings.json';
const serverWeb = settings.serverURL;
const fetched = ref(null);
const CarID = ref(null);

onMounted (() => {
  axios.get(serverWeb+'/api/get_car_info').then(response => {
	fetched.value = response.data;
  }).catch(error => {
	console.log(error);
  });
})

function RegistCar() {
	  axios.post(serverWeb+'/api/regist_car',{carID:  CarID.value}).then((response)=>{
		const statusCode = response.status;
		if(statusCode === 200){
		  ElMessage("车辆添加成功")
		}
		else if(statusCode !== 200){
		  ElMessage("车辆添加失败")
		}
	  }).catch((error)=>{
		ElMessage("车辆添加失败");
	  });
}

</script>

<template>
  <el-container direction="vertical">
  <el-container class = "form-item-top">
  <el-form>
	  <el-input
		  type = "number"
		  v-model="CarID"
		  placeholder="请输入车辆编号"
	  />
	  <el-button @click="RegistCar">提交</el-button>
  </el-form>
  </el-container>
	<el-container class = "car-info">
  <car-setting class="car-info"
	  v-for = "(item,index) in fetched"
	  :key="item.car_id"
	  :CarId="item.car_id"
	  :CarIp="item.car_ip"
	  :CO2 = "item.current_co2"
	  :TVOC = "item.current_tvoc"
	  :Time = "item.time"
  ></car-setting>
	</el-container>
  </el-container>
</template>

<style scoped>
.car-setting{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.car-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.form-item-top {
  display: flex;
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  margin-bottom: 20px; /* 根据需要调整外边距 */
  max-height: 70px;
}
</style>

<script>

</script>