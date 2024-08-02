<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, ref } from 'vue';
import { Pie } from 'vue-chartjs'
//import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

//const props = defineProps(['data']);
/*
defineProps<{
    data?: any
}>()
*/

const props = defineProps({
    data: {
        required: true,
    },
})

const received_data = ref(props.data);

onMounted(() => {
    //const productNameArray = props.data?.map((obj: any) => obj.productName);
    console.log(received_data.value);
});

const chartData = {
  labels: ["A","B"],
  datasets: [
    {
      //backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [0,0]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
    <Pie :data="chartData" :options="options" />
</template>
