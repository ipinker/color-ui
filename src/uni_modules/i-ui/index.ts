import { UIConfigInstance } from "./common/config"
export const UIConfig = UIConfigInstance;
export * from "./common/constants"
export * from "./common/style"
const _uni : any = uni;
_uni.$i = {
    config: UIConfigInstance,
}

const install = (Vue: any) => {
    // #ifndef APP-NVUE
    Vue.config.globalProperties.$i = _uni.$i;   
    // #endif
}

export default {
    install
}