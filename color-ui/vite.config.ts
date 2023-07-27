import {fileURLToPath, URL} from 'url'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from "vite";
import {copyFile} from "./config/plugins/file";

const pathResolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '@': pathResolve('./src') // fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    base: "./src",
    root: "./",
    build: {
        sourcemap: true,
        //打包后文件目录
        outDir: "dist",
        reportCompressedSize: true,
        target: 'esnext',
        minify: 'esbuild', // 混淆器，terser构建后文件体积更小
        // minify: false,
        rollupOptions: {
            //忽略打包vue文件
            external: ["vue"],
            input: ["./src/index.ts"],
            output: [
                {
                    //打包格式
                    format: "es",
                    //打包后文件名
                    entryFileNames: "[name].mjs",
                    //让打包目录和我们目录对应
                    preserveModules: false,
                    preserveModulesRoot: "./src",
                    exports: "named",
                    //配置打包根目录
                    dir: "./dist",
                },
                {
                    //打包格式
                    format: "cjs",
                    //打包后文件名
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    preserveModules: false,
                    preserveModulesRoot: "./src",
                    exports: "named",
                    //配置打包根目录
                    dir: "./dist",
                },
                {
                    //打包格式
                    format: "es",
                    //打包后文件名
                    entryFileNames: "[name].mjs",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    preserveModulesRoot: "./src",
                    exports: "named",
                    //配置打包根目录
                    dir: "./es",
                },
                {
                    //打包格式
                    format: "cjs",
                    //打包后文件名
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    preserveModulesRoot: "./src",
                    exports: "named",
                    //配置打包根目录
                    dir: "./lib",
                },
            ],
        },

        lib: {
            entry: "./src/index.ts"
        },
    },
    plugins: [
        AutoImport(),
        Components(),
        vue({
            reactivityTransform: true
        }),
        dts({
            entryRoot: "./src",
            outputDir: ["./types"],
            //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
            tsConfigFilePath: "./tsconfig.json",
        }),
        DefineOptions()
    ],
    optimizeDeps: {
        disabled: true,
    }
})