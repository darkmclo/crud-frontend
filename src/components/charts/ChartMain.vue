<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
// DataPage.vue
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale)

export default {
    name: 'ChartMain',
    components: { Pie },
    props: {
        reactiveData: {
            type: Object,
            required: true
        },
    },
    computed: {
        chartData() { 
            return {
                reactiveData
                /*
                labels: productData.value.productName,
                datasets: [{
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10]
                }]
                */
            }
        },
        chartOptions() { 
            return {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
   /*
    mounted () {
        this.renderChart({
            labels: ['January', 'February', 'March'],
            datasets: [
                {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20, 12]
                }
            ]
        })
    }
    */
}
</script>