<script setup>
import {onMounted,ref} from "vue";
import axios from "axios";
import CarSetting from '@/components/CarSetting.vue'
import  settings from '@/settings.json';
const serverWeb = settings.serverURL+'/api/get_car_info';
const fetched = ref(null);


onMounted (() => {
  axios.get(serverWeb).then(response => {
	fetched.value = response.data;
  }).catch(error => {
	console.log(error);
  });
})
</script>

<template>
  <el-container class = car-setting>
  <car-setting
	  v-for = "(item,index) in fetched"
	  :key="item.car_id"
	  :CarId="item.car_id"
	  :CarIp="item.car_ip"
	  :CO2 = "item.current_co2"
	  :TVOC = "item.current_tvoc"
	  :Time = "item.time"
  ></car-setting>
  </el-container>
</template>

<style scoped>
.car-setting{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

<script>

</script>