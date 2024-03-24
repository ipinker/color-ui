<template>
    <IPage title="Space (空白占位)" useBack>
        <div>Props： width，height, bg, bgColor, margin, inline</div>
        <div>Width=200；height=200;bg=red</div>
        <ISpace width="200" height="200" bg="red"></ISpace>
        <div>Width=100；height=100;bg=red;margin=20;inline=true</div>
        <ISpace width="100" height="100" bg="red" inline margin="20"></ISpace>
        <ISpace width="100" height="100" bg="red" inline margin="20"></ISpace>
        <ISpace width="100" height="100" bg="red" inline></ISpace>
    </IPage>
</template>
