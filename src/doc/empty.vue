<template>
    <IPage useBack title="Empty" center>
        <div>Default</div>
        <IEmpty />
        <div class="w-300 border-bottom margin-m"></div>
        <div>Add tip=暂无数据</div>
        <IEmpty tip="暂无数据"/>
        <div class="w-300 border-bottom margin-m"></div>
        <div>Add plain</div>
        <IEmpty plain/>
        <div class="w-300 border-bottom margin-m"></div>
        <div>Add plain & width & height</div>
        <IEmpty width="400rpx" height="400rpx" plain/>
    </IPage>
</template>

<script lang="ts" setup>
</script>

