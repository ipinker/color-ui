<!--
 * @Author: Gavin New
 * @Date: 2023-08-25 19:45:55
* @LastEditors: white_queen
* @LastEditTime: 2024-03-05 15:50:11
 * @FilePath: /renovation/src/App.vue
 * @Description:
-->
<script setup lang="ts">
	import { onLaunch, onShow, onHide, onBackPress } from "@dcloudio/uni-app";
    import { useGlobalStore } from "@/store/global";
    const globalStore = useGlobalStore();

	onLaunch(() => {
        const sysInfo: UniApp.GetSystemInfoResult = uni.getSystemInfoSync();
        globalStore.changeSystem(sysInfo);
	});
	onBackPress(() => {
	    console.log("Back");
	});
</script>
<style lang="scss">
/** @desc 导入 i-uni-ui 的公共样式 **/
@import "@/uni_modules/i-ui/components/index.scss";
/** @desc 导入自己的字体图标哭 **/
@import '@/static/font/iconfont.css';

/** @desc 自定义字体 **/
@font-face {
    font-family: Latin;
    src: url("~static/fonts/HaeHangul.ttf") format("truetype");
}

/** @desc 设置全局页面配置 **/
page {
    max-width: 100vw;
    overflow-x: hidden;
    box-sizing: border-box;
}


</style>
