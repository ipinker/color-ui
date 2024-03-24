export const NAVIGATE_LIST = [ "navigateTo", "reLaunch", "redirectTo", "switchTab" ] as const;
/** @desc 页面级的跳转类型 **/
export type NavigateType = (typeof NAVIGATE_LIST)[number];