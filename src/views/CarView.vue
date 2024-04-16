<script setup>
import {ref, computed, onMounted, inject} from 'vue'
import carInfo from "@/components/CarInfo.vue";
// 引入axios
import axios from 'axios'
import  settings from '@/settings.json'
const serverWeb = settings.serverURL;
const fetched = ref(null)
onMounted(()=>{
	axios.get(serverWeb).then(response => {
	  fetched.value = response.data;
	}).catch(error => {
	  console.log(error);
	});
})

</script>



<template>
  <el-container class = "car-info">
  <car-info
	v-for = "(item,index) in fetched"
	:key="item.car_id"
	:CarId="item.car_id"
	:CarIp="item.car_ip"
	:CO2 = "item.current_co2"
	:TVOC = "item.current_tvoc"
	:Time="item.time"

	>

  </car-info>
  </el-container>
</template>

<style scoped>
.car-info{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

<script>

</script>