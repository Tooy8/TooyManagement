<template>
    <div id="mymap" style="width: 1000px;height: 470px;margin-left: 100px;">
    </div>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive, watch } from "vue"
import *as echarts from 'echarts'
import china from '../../../data/chian.json'
echarts.registerMap('china', china as any)

const props = defineProps<{
    data: {}[]
}>()


let myMap: echarts.ECharts

watch(() => props.data, () => {
    const data = props.data.map((item: { [key: string]: string | number }) => ({ value: item.saleNum, name: item.areaName }))
    console.log(data);

    if (!myMap) {
        myMap = echarts.init(document.getElementById('mymap') as HTMLElement);
    }
    const options = {
        tooltip: {
            show: true,
            formatter: '{b0}<br />销量：{c0}',
            backgroundColor: 'rgba(50,50,50,0,0.7)',
            textStyle: {
                color: '#fff'
            }
        },
        series: {
            type: 'map',
            map: 'china',
            emphasis: {
                label: {
                    show: true
                },
                itemStyle: {
                    areaColor: 'red'
                }
            },
            itemStyle: {
                borderColor: '#fff'
            },
            data
        },
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 1000000,
            calculable: true,
            inRange: {
                color: ['pink', 'red']
            }
        }
    }

    // 使用刚指定的配置项和数据显示图表。
    myMap.setOption(options);

})

</script>

<style lang="less" scoped></style>