<template>

    <IPage title="Col" useBack center>
        justify = between
        <ICol class="IColComponent bg-blue-100" justify="between">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        justify = around
        <ICol class="IColComponent bg-blue-100" justify="around">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        justify = start
        <ICol class="IColComponent bg-blue-100" justify="start">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        justify = end
        <ICol class="IColComponent bg-blue-100" justify="end">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        justify = center
        <ICol class="IColComponent bg-blue-100" justify="center">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        align = start
        <ICol class="IColComponent bg-blue-100" align="start">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        align = center
        <ICol class="IColComponent bg-blue-100" align="center">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
        align = end
        <ICol class="IColComponent bg-blue-100" align="end">
            <div class="w-60px h-40px bg-red-300">124</div>
            <div class="w-60px h-40px bg-amber-300">124</div>
            <div class="w-60px h-40px bg-green-300">124</div>
        </ICol>
    </IPage>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">

.IColComponent {
    width: 400rpx;
    height: 400rpx;
}
</style>
