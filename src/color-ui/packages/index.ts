import installer from './defaults';
export * from './components';
export * from './common/make-installer';

export const install = installer.install;
export const version = installer.version;
export default installer;

