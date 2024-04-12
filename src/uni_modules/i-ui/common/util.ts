import { SYS_CACHE_KEY } from "./style";

export function getSystemInfo (): UniApp.GetSystemInfoResult {
    let SYS_INFO: UniApp.GetSystemInfoResult = uni.getStorageSync(SYS_CACHE_KEY) as UniApp.GetSystemInfoResult;
    if(!SYS_INFO) SYS_INFO = uni.getSystemInfoSync();
    return SYS_INFO;
}