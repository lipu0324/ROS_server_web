<script setup>
import {onMounted} from "vue";
import axios from "axios";
import CarSetting from '@/components/CarSetting.vue'
import  settings from '@/settings.json';
const severWeb = settings.serverURL;
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
  <car-setting
	  v-for = "(item,index) in fetched"
	  :key="item.car_id"
	  :CarId="item.car_id"
	  :CarIp="item.car_ip"
	  :CO2 = "item.current_co2"
	  :TVOC = "item.current_tvoc"
	  :Time = "item.time"
  ></car-setting>
</template>

<style scoped>

</style>

<script>

</script>