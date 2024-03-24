<template>
	<!-- #ifndef H5 -->
    <template v-for="(ele,index) in nodesArr" :key="index">
        <text :style="[{color}]" v-if="ele && ele.name && ele.name === 'a'" class="normal"  @click="handleNativeClick(node, $event)">
            <rich-text :nodes="[ele]"></rich-text>
        </text>
        <!--br类型-->
        <text :style="[{color}]" v-else-if="ele.name && ele.name ==='br'">\n</text>
        <!--span类型-->
        <text :style="[{color}]" v-else-if="ele.name && ele.name ==='span'">
            <rich-text :nodes="[ele]"></rich-text>
        </text>
        <!--判断是否是文本节点-->
        <block v-else-if="ele.type && ele.type === 'text'">{{ele.text}}</block>
        <!--其他类型-->
        <rich-text :style="[{color}]" v-else :nodes="[ele]"></rich-text>
    </template>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<div :style="[{color}]" v-html="node"></div>
	<!-- #endif -->	
</template>

<script lang="ts" setup>
	import { PropType } from 'vue';
    import htmlParser from './helper';
    const emits = defineEmits(["navigate"]);
    const props = defineProps({
        nodes: {
            type: Array as PropType<any[]>,
            default:()=>[]
        },
        node: {
            type:String,
            default:""
        },
        color: String
    });

    const nodesArr = computed(() => {
        if(Array.isArray(props.nodes)&& props.nodes.length) {
            return props.nodes
        }
        if(props.node) {
            return htmlParser(props.node);
        }
        return props.nodes
    });
    const handleNativeClick = (node: any,event: any) => {
        if(node.attrs && node.attrs.href) {
            emits('navigate',node.attrs.href)
        }
    }
</script>

<style lang="scss" scoped>
	rich-text {
		display: inline;
	}
	.normal {
		display: inline;
		text-decoration: underline;
	}
</style>