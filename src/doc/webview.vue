<template>
   <IPage :title='title' useBack>
       <web-view :src="url" class="WebView"></web-view>
   </IPage>
</template>

<script setup lang='ts'>
    import { ref } from "vue";
    import { onLoad } from "@dcloudio/uni-app"
    import { QueryOption } from "../typings"

    const title = ref("Webview")
    const url = ref("https://i.ipink.pink")
    onLoad((options) => {
        const _options = options as QueryOption
        if(_options.title) title.value = _options.title;
        if(_options.url) url.value = _options.url;
    })
</script>

<style lang='scss'>
.WebView {
    width: 100vw;
    height: 100vh;
}
</style>