<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-11 23:45:48
 * @FilePath: /ipink-lib/src/App.vue
 * @Description: 描述
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
    console.log("onLaunch")
})
</script>
<style lang="scss">
@import "./uni.scss";
page {
    padding-top: 1rpx;
}


.i-title {
    width: 100%;
    line-height: 80rpx;
    margin-top: 20rpx;
    padding: 0 20rpx;
    color: #898989;
    font-size: 36rpx;

}

.i-card {
    width: 710rpx;
    margin: 20rpx;
    box-shadow: 0px -2px 4px 0px rgba(220,220,220,0.5);
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;
}

.i-link {
    .i-link-item {
        height: 100rpx;
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20rpx;
        border-bottom: 1rpx solid #BCC1C2;
        &:last-child {
            border: none;
        }
        .i-link-item-label {
            font-size: 30rpx;
            color: #232323;
            flex: 1;
        }
        .i-link-item-icon {
            font-size: 32rpx;
            color: $colorPrimary;
        }
    }
}


// 按钮/卡片 长按效果类型
.Active,
.ActiveDefault {
	opacity: 1;
	transition: all .3s;
	&:active {
		opacity: 0.6;
	}
}

.ActiveGray {
	opacity: 1;
	transition: all .3s;
	&:active {
		background-color: #DEDEDE !important;
		opacity: 0.7;
	}
}

.ActiveLightGray {
	transition: all .3s;
	&:active {
		background-color: #F4F4F7 !important;
		opacity: 0.8;
	}
}
.ActivePrimary {
	transition: all .3s;
	&:active {
		background-color: $colorPrimary !important;
		opacity: 0.6;
	}
}
</style>
