import * as pinia from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

export const Pinia = pinia;

const store = Pinia.createPinia();
store.use(
    createPersistedState({
		storage: {
		    getItem: uni.getStorageSync,
		    setItem: uni.setStorageSync,
		},
    }),
)


export default store;