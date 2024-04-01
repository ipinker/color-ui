import { ExtractPropTypes } from 'vue';

export const gridProps = {
    // 每列显示个数
    column: {
        type: [String, Number],
        default: 2
    },
    // 是否显示边框
    useBorder: {
        type: Boolean,
        default: true
    },
    // 边框颜色
    borderColor: String,
    // 是否正方形显示,默认为 true
    square: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
};

export type GridPropsType = ExtractPropTypes<typeof gridProps>;
