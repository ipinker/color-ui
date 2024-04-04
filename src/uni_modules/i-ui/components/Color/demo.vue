<template>
	<view class="wrapper">
		<view class="wrapper-top">
			<view class="wrapper-top-title">
				<view class="titleZ" :style="[{color: colors.hex}]">
					Z
				</view>
				<view class="titleE" :style="[{color: colors.hex}]">
					E
				</view>
				<view class="titleB"
					:style="[{backgroundImage: `linear-gradient(90deg, ${colors.hex}, ${colors1.hex})`}]">
					B
				</view>
				<view class="titleR" :style="[{color: colors1.hex}]">
					R
				</view>
				<view class="titleA" :style="[{color: colors1.hex}]">
					A
				</view>
				<view class="line"
					:style="[{backgroundImage: `linear-gradient(90deg, ${colors.hex}, ${colors1.hex})`}]"></view>
				<view class="iconfont icon-yanse" :style="[{color: colors1.hex}]">
				</view>
			</view>
		</view>
		<view class="wrapper-content row">
			<view class="wrapper-content-chrome">
				<ZColorPicker v-model="colors" showButton/>
			</view>
			<view class="wrapper-content-sketch">
				<ZColorPicker v-model="colors1" />
			</view>
		</view>

	</view>
</template>

<script>
	import ZColorPicker from "./index.vue"
	export default {
		components: {
			ZColorPicker
		},
		data() {
			return {
				colors: {
					hex: '#7ED321'
				},
				colors1: {
					hex: '#50E3C2'
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/fonts.css';

	.wrapper {

		.wrapper-content {
			padding: 30rpx 0;
			flex-direction: column;
			align-items: center;

			.wrapper-content-chrome {
				width: 600rpx;
				box-shadow: 0 0 4rpx rgba(0, 0, 0, .3), 0 8rpx 16rpx rgba(0, 0, 0, .3);
			}

			.wrapper-content-sketch {
				box-shadow: 0 0 0 2rpx rgba(0, 0, 0, .15), 0 16rpx 32rpx rgba(0, 0, 0, .15);
				margin-top: 50rpx;
			}
		}

		.wrapper-top {
			margin-top: calc(env(safe-area-inset-bottom) + 80rpx);
			padding: 50rpx;

			@media only screen and (min-width: 760rpx) {
                @include flex;
				justify-content: center;
			}

			.wrapper-top-title {
				font-size: 186rpx;
				font-weight: bold;
				font-family: '851';
                @include flex;
				align-items: center;
				letter-spacing: 20rpx;
				position: relative;

				.line {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 20rpx;
					border-radius: 10rpx;
				}

				.icon-yanse {
					font-size: 86rpx;
					font-weight: bold;
					position: absolute;
					right: 0;
					top: 0;
				}

				.titleZ {
					transform: rotate(-20deg);
				}

				.titleE {
					transform: rotate(-20deg);
				}

				.titleB {
					transform: rotate(-20deg);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.titleR {
					transform: rotate(-20deg);
				}

				.titleA {
					transform: rotate(-20deg);
				}
			}
		}
	}
</style>
