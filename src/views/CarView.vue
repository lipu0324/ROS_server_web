<script setup>
import {ref, computed, onMounted, inject} from 'vue'
import carInfo from "@/components/CarInfo.vue";
// 引入axios
import axios from 'axios'
const serverWeb = inject('serverWeb')
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
  <car-info
	v-for = "(item,index) in fetched"
	:key="item.car_id"
	:car_id="item.car_id"
	:car_ip="item.car_ip"
	:co2 = "item.current_co2"
	:tvoc = "item.current_tvoc"
	:time = "item.time"
	>

  </car-info>
</template>

<style scoped>

</style>

<script>

</script>