import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import {defineConfig, normalizePath} from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
    base: "./",
    root: "./",
    css: {
        modules: {
            generateScopedName: "[name]__[local]___[hash:base64:5]"
        },
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定目标浏览器
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
                })
            ]
        }
    },
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
            external: ["vue", "@ant-design/colors", "@ctrl/tinycolor", "pinia"],
            input: ["./index.ts"],
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
            ],
        },

        lib: {
            entry: "./index.ts"
        },
    },
    plugins: [
        vue({
            reactivityTransform: true
        }),
        dts({
            entryRoot: "./",
            //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
            tsconfigPath: "./tsconfig.json",
        }),
        DefineOptions()
    ]
})