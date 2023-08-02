import installer from './defaults';
export * from './components/index';
export * from './common/make-installer';
import { createThemeStore } from './components/theme';
export const useThemeStore = createThemeStore();
export const install = installer.install;
export const version = installer.version;
export default installer;

