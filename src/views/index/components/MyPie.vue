<template>
    <el-radio-group v-model="selectLabel" @change="dayChange">
        <el-radio-button label="sale_">销量</el-radio-button>
        <el-radio-button label="_money">销售额</el-radio-button>
    </el-radio-group>

    <el-select v-model="selectDay" placeholder="Select" @change="dayChange">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>


    <div id="pie" style="height:350px;width:100%">
    </div>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive, onMounted, watch } from "vue"
import *as echarts from 'echarts'



const state = reactive({
    selectLabel: '_money',
    selectDay: 'today',
    options: [
        { name: '今天', value: 'today' },
        { name: '昨天', value: 'yesterday' },
        { name: '前三天', value: 'three_days' },
        { name: '前七天', value: 'seven_days' },
    ]
})
const { selectLabel, selectDay, options } = toRefs(state)

const props = defineProps<{
    data: {}[]
}>()

let myChart: echarts.ECharts

const dayChange = () => {
    initPie()
}


const initPie = () => {
    let key = ''
    if (selectLabel.value == '_money') {
        key = selectDay.value + selectLabel.value
    } else {
        key = selectLabel.value + selectDay.value
    }

    const arr = props.data.map((item: { [key: string]: string }) => ({ value: item[key], name: item.name }))
    // 初始化实例
    if (!myChart) {
        myChart = echarts.init(document.getElementById('pie') as HTMLElement);
    }
    const option = {
        legend: {
            top: 20,
            right: 500,
            width: 300,
            height: 100,
            orient: 'vertical'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['25%', '45%'],
                data: arr
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

watch(() => props.data, () => {
    initPie()

})



</script>

<style lang="less" scoped></style>