import { makeInstaller } from './common/make-installer';
import Components from './component';
import { createThemeStore } from "./components";
export default makeInstaller([ ...Components ], [createThemeStore]);
