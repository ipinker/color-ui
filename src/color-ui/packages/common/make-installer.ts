import {version} from './version'
import type {App, Plugin} from 'vue'

export const makeInstaller = (components: Plugin[] = [], configList: CallableFunction[]) => {
    const install = (app: App, options?: any) => {
        components.forEach((c) => app.use(c));
        configList.forEach((c) => c(app, options));
    }

    return {
        version,
        install,
    }
}
