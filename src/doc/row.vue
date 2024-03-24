<template>

    <IPage title="Row" useBack center>
        justify = between
        <IRow class="IRowComponent h-60px bg-blue-100" justify="between">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        justify = around
        <IRow class="IRowComponent h-60px bg-blue-100" justify="around">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        justify = start
        <IRow class="IRowComponent h-60px bg-blue-100" justify="start">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        justify = end
        <IRow class="IRowComponent h-60px bg-blue-100" justify="end">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        justify = center
        <IRow class="IRowComponent h-60px bg-blue-100" justify="center">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        align = start
        <IRow class="IRowComponent h-60px bg-blue-100" align="start">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        align = center
        <IRow class="IRowComponent h-60px bg-blue-100" align="center">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
        align = end
        <IRow class="IRowComponent h-60px bg-blue-100" align="end">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </IRow>
    </IPage>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">

.IRowComponent {
    width: 500rpx;
}
</style>
