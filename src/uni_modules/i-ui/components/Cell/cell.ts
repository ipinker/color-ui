import { ExtractPropTypes, PropType } from "vue";
import {CLICK_EVENT, NavigateType} from "../../common/constants";

export const cellProps = {
    icon: String,
    iconStyle: Object,
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String as PropType<NavigateType>,
        default: "navigateTo"
    },
    arrow: {
        type: String,
        default: "forward-new"
    },
    arrowColor: {
        type: String
    },
    styleOption: {
        type: Object,
        default: () => ({})
    }
} as const;

export type CellPropsType = ExtractPropTypes<typeof cellProps>;

export type CellEmitsType = {
    [ CLICK_EVENT ] : () => undefined
}