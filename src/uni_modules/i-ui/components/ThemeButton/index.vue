<template>
	<div class="ThemeContainer active-gray flex-center radius-circle" :style="[themeStyle]" @click="changeTheme">
        <UIIcon class="ThemeIcon" size="40" :icon="isLight ? 'light' : 'dark' "/>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { mapStores } from "pinia";
import {useThemeStore} from "../../theme"
import {CHANGE_EVENT, DEFAULT_THEME_MODE} from "../../common/constants"
import UIIcon from "../Icon/index.vue"
import { genSize } from "../../common/style";
import { setDarkMode, themeButtonProps, ThemeButtonPropsType, ThemeButtonEmitsType } from "./themeButton"

const props: ThemeButtonPropsType = defineProps(themeButtonProps)

const emits = defineEmits([CHANGE_EVENT])

const useStore = mapStores(useThemeStore).themeStoreStore();
const isLight = computed(() => useStore.$state.modeId == DEFAULT_THEME_MODE);
const{ width, height=width } = genSize(props.size);
const themeStyle = {
    width: width,
    height: height
}
const changeTheme = () => {
    useStore.changeMode();
    if(props.useBuiltIn) setDarkMode(useStore.mode);
    emits(CHANGE_EVENT, useStore.mode);
}
</script>

<style lang="scss" scoped>
	.ThemeContainer {
		.ThemeIcon {
            transition: all .3s;
            opacity: 1;
        }
        &:active {
            .ThemeIcon {
                opacity: 0.65;
            }
        }
	}
</style>