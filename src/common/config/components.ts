export type ComponentItem = {
    component: string,
    title: string,
    path: string
}
export type ComponentsItem = {
    components: ComponentItem[],
    title: string,
}
export const colorComponents: ComponentItem[] = [
    { component: "", title: "色彩", path: "/pages/components/theme/theme" }
];
export const basicComponents: ComponentItem[] = [
    { component: "Button", title: "按钮", path: "/pages/components/button/button" },
];



const componentsCollection: ComponentsItem[] = [
    {
        title: "主题",
        components: colorComponents
    },
    {
        title: "基础组件",
        components: basicComponents
    }
];

export default componentsCollection;