import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import {defineConfig, normalizePath} from "vite";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
    base: "./",
    root: "./",
    css: {
        modules: {
            localsConvention: "camelCaseOnly", // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
            scopeBehaviour: "local", // 配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
            // generateScopedName: "[name]__[local]___[hash:base64:5]"
            generateScopedName: (name, filename, css) => {
                console.log("-----------------------------------------");
                console.log(name, filename, css);
                return `[${name}]`;
            },
            hashPrefix: "iui"
        },
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定目标浏览器
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
                }),
                postcssPresetEnv()
            ]
        }
    },
    build: {
        sourcemap: true,
        //打包后文件目录
        outDir: "dist",
        reportCompressedSize: true,
        target: 'esnext',
        minify: 'terser',
        // minify: false,
        terserOptions: {
            compress: {
                // 打包自动删除console
                drop_console: true,
                drop_debugger: true
            },
            keep_classnames: true,
        },
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
                    preserveModulesRoot: "./",
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
                    preserveModulesRoot: "./",
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