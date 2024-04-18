<script setup>
import {ref, computed, onMounted, inject} from 'vue'
import carInfo from "@/components/CarInfo.vue";
// 引入axios
import axios from 'axios'
import settings from '@/settings.json'

const serverWeb = settings.serverURL + '/api/get_car_info'
const fetched = ref(null)
onMounted(() => {
  axios.get(serverWeb).then(response => {
	fetched.value = response.data;
  }).catch(error => {
	console.log(error);
  });
})

</script>


<template>
  <el-container class="car-info">
	<div v-for="(item,index) in fetched"
				  :key="item.car_id"
	>
	  <car-info
		  :CarId="item.car_id"
		  :CarIp="item.car_ip"
		  :CO2="item.current_co2"
		  :TVOC="item.current_tvoc"
		  :Time="item.time"
	  >
	  </car-info>
	  <el-button>
		<a :href="'http://'+item.car_ip" target="_blank" style="color: black;text-decoration: none">进入车辆控制页面</a>
	  </el-button>
	</div>
  </el-container>
</template>

<style scoped>
.car-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

<script>

</script>