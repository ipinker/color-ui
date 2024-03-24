/*
 * @Author: Gavin New
 * @Date: 2023-08-25 19:45:55
 * @LastEditors: Gavin New | 1242849166@qq.com
 * @LastEditTime: 2024-02-19 09:50:10
 * @FilePath: /renovation/vite.config.ts
 * @Description: 描述
 */
import path from 'node:path'
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// @see https://unocss.dev/
import UnoCSS from 'unocss/vite'
// @see https://github.com/jpkleemans/vite-svg-loader
// @see https://github.com/vbenjs/vite-plugin-vue-setup-extend
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// @see https://github.com/vbenjs/vite-plugin-svg-icons
import AutoImport from 'unplugin-auto-import/vite'

import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default ({ command, mode }) => {
	const isPro = mode === 'production';
	return defineConfig({
		plugins: [
			uni(),
            UnoCSS(),
			// svg 可以当做组件来使用(Vite plugin to load SVG files as Vue components, using SVGO for optimization.)
			vueSetupExtend(),
			AutoImport({
				imports: ['vue', 'uni-app'],
				dts: 'src/auto-import.d.ts',
				dirs: ['src/hooks'], // 自动导入 hooks
				eslintrc: { enabled: true },
			}),
			isPro && visualizer({
				filename: './node_modules/.cache/visualizer/stats.html',
				open: true,
				gzipSize: true,
				brotliSize: true,
			}),
		],

		resolve: {
			alias: {
				'@': path.join(process.cwd(), './src'),
				'#': path.join(process.cwd(), './i-js'),
			},
		},
		server: {
			host: '0.0.0.0',
			hmr: true,
			port: 9000,
		},
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: isPro,
					drop_debugger: isPro
				},
			},
		},
	})
};
