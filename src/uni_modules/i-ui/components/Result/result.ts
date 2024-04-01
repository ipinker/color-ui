
import { PropType, ExtractPropTypes } from "vue";

import {ButtonType} from "../Button/button";
import {SizeType, ResultStatus} from "../../common/constants";

export type BtnInfo = {
    label: string
    url?: string
    type?: ButtonType
    plain?: boolean
    size?: SizeType
}

export const resultProps = {
    type: {
        type: String as PropType<ResultStatus>,
        default: "success"
    },
    icon: String,
    title: String,
    desc: String,
    btnList: Array as PropType<BtnInfo[]>
} as const;
export type ResultPropsType = ExtractPropTypes<typeof resultProps>;