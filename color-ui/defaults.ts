import { makeInstaller } from './common/make-installer';
import Components from './component';
import { createThemeStore } from "./components/theme";
export default makeInstaller([ ...Components ], [createThemeStore]);
