<template>
    <IPage>
        <INavigationBar title="Button" useBack/>
        <ICard title="Default button">
            <ITitle>Props：-</ITitle>
            <IButton>Default</IButton>
            <ITitle>Props：plain</ITitle>
            <IButton plain>Default plain</IButton>
            <ITitle>Props：disabled</ITitle>
            <IButton disabled>Default disabled</IButton>
        </ICard>
        <ICard title="Button`s size">
            <ITitle>Props：size,primary</ITitle>
            <IButton primary size="mini">mini</IButton>
            <IButton primary size="xs">xs</IButton>
            <ISpace height="20"/>
            <IButton primary size="small">small</IButton>
            <IButton primary size="s">s</IButton>
            <ISpace height="20"/>
            <IButton primary size="normal">size=normal</IButton>
            <IButton primary size="m">size=m</IButton>
            <ISpace height="20"/>
            <IButton primary size="big">size=big</IButton>
            <ISpace height="20"/>
            <IButton primary size="l">size=l</IButton>
            <ISpace height="20"/>
            <IButton primary size="xl">size=xl</IButton>
            <ISpace height="20"/>
            <IButton primary size="large">size=large</IButton>
            <ISpace height="20"/>
            <IButton primary size="xxl">size=xxl</IButton>
        </ICard>
        <ICard title="Button`s round">
            <ITitle>Props：primary, round, size</ITitle>
            <IRow justify="space-around">
                <IButton primary round size="xs">XS</IButton>
                <IButton primary round size="s">S</IButton>
                <IButton primary round size="m">M</IButton>
                <IButton primary round size="l">L</IButton>
                <IButton primary round size="xl">XL</IButton>
                <IButton primary round size="xxl">XXL</IButton>
            </IRow>
        </ICard>

        <ICard title="Text button">
            <ITitle>Props：text</ITitle>
            <IButton text>text</IButton>
            <ITitle>Props：text, disabled</ITitle>
            <IButton disabled text>disabled text</IButton>
        </ICard>
        <ICard title="Link button">
            <ITitle>Props：link</ITitle>
            <IButton link>link</IButton>
            <ITitle>Props：link, disabled</ITitle>
            <IButton disabled link>disabled link</IButton>
        </ICard>
        <ICard title="Primary button">
            <ITitle>Props：primary</ITitle>
            <IButton primary>Default</IButton>
            <ITitle>Props：primary，plain</ITitle>
            <IButton primary plain>Default</IButton>
            <ITitle>Props：primary，plain,disabled</ITitle>
            <IButton primary plain disabled>Default</IButton>
        </ICard>
        <ICard title="Warning button">
            <ITitle>Props：warning</ITitle>
            <IButton warning>Default</IButton>
            <ITitle>Props：warning，plain</ITitle>
            <IButton warning plain>Default</IButton>
            <ITitle>Props：warning，plain,disabled</ITitle>
            <IButton warning plain disabled>Default</IButton>
        </ICard>
        <ICard title="Error button">
            <ITitle>Props：error</ITitle>
            <IButton error>Default</IButton>
            <ITitle>Props：error，plain</ITitle>
            <IButton error plain>Default</IButton>
            <ITitle>Props：error，plain,disabled</ITitle>
            <IButton error plain disabled>Default</IButton>
        </ICard>
        <ICard title="Info button">
            <ITitle>Props：info</ITitle>
            <IButton info>Default</IButton>
            <ITitle>Props：info，plain</ITitle>
            <IButton info plain>Default</IButton>
            <ITitle>Props：info，plain,disabled</ITitle>
            <IButton info plain disabled>Default</IButton>
        </ICard>

        <ICard title="Custom background button">
            <ITitle>Props：bg=#0ff；自定义背景色</ITitle>
            <IButton bg="#0ff">custom yarn button</IButton>
            <ITitle>Props：bg=#0ff,color=red 自定义背景色,自体色</ITitle>
            <IButton bg="#0ff" color="red">custom yarn button</IButton>
        </ICard>
        <ICard title="Loading button">
            <ITitle>Props：loading；加载按钮</ITitle>
            <IButton loading>Loading</IButton>
            <ISpace height="20"/>
            <IButton type="primary" :loading="loading">Loading</IButton>
            <ISpace height="20"/>
            <IButton type="primary" :loading="loading" icon="icon-search">Loading</IButton>
            <ISpace height="20"/>
            <IButton type="primary" @click="loading=!loading">{{loading ? "停止" : "开始"}}</IButton>
        </ICard>
    </IPage>
</template>
<script setup lang="ts">
const loading = ref(true);
</script>
