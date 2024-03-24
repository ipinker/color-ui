<template>
    <IPage title="Card" useBack>

        <ICard>
            Default card content
        </ICard>

        <ICard title="Title Card">
            Title card content
        </ICard>

        <ICard title="Props" width="600">
            <ITitle>title { string }</ITitle>
            <ITitle>width { string | number }</ITitle>
            <ITitle>height { string | number }</ITitle>
            <ITitle>radius { string | number }</ITitle>
            <ITitle>useHeader { boolean }</ITitle>
            <ITitle>full { boolean }</ITitle>
            <ITitle>loading { boolean }</ITitle>
        </ICard>

        <ICard title="Slots" width="600rpx">
            <ITitle>default</ITitle>
            <ITitle>header</ITitle>
        </ICard>

        <ICard title="Full Card, width used 100%" full>
            For props`s full
        </ICard>

        <div style="width:600rpx; margin: 0 auto;">
            <ICard title="Full Card, width used 100%, it`s 600rpx, so you need change parentNode`s wdith" full>
                For props`s full, it`s 100% for parent
            </ICard>
        </div>

        <ICard useHeader>
            <template v-slot:header>
                <p style="color: red">Html title card, use slot</p>
            </template>
            Title card content
        </ICard>
    </IPage>
</template>
