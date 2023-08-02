import {version} from './version'
import type {App, Plugin} from 'vue'
export type SFCWithInstall<T> = T & Plugin

export const makeInstaller = (components: Plugin[] = [], configList: CallableFunction[]) => {
    const install = (app: App, options?: any) => {
        configList.forEach((c) => c(app, options));
        components.forEach((c) => {
            app.use(c);
        });
    }

    return {
        version,
        install,
    }
}

export const withInstall = <T, E extends Record<string, any>>(
    main: T,
    extra?: E,
) => {
    (main as SFCWithInstall<T>).install = (app): void => {
        console.log([main, ...Object.values(extra ?? {})])
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            console.log(comp.name)
            app.component(comp.name, comp)
        }
    }

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp
        }
    }
    return main as SFCWithInstall<T> & E
}
