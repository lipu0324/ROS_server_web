

<template>
  <div>
  <el-card
  :body-style="{ padding: '10px' ,backgroundColor:'#7f7f7f'}"
  :border-radius="10"
  :shadow="hover"
  >
	<template #header>
		<div class = "card-header">
		 <span>车辆ID: {{CarId}}</span>
		</div>
	</template>
	<p class = "text item">车辆VPNIP地址:{{CarIp}}</p>
	<p class = "text item">实时CO2浓度:{{CO2}}</p>
	<p class = "text item">实时TVOC浓度:{{TVOC}}</p>
	<template #footer>最后更新时间:{{Time}}</template>
  </el-card>
  </div>
</template>

<script>

import {ref,defineProps} from 'vue';

export  default {
  props:{
	CarId:String,
	CarIp:String,
	CO2:Number,
	TVOC:Number,
	Time:String,
  },
  setup(props,context){

  }
}


</script>

<style scoped>

</style>