import { ExtractPropTypes } from "vue"

export const titleProps = {
    title: String,
    showSign: {
        type: Boolean,
        default: true
    },
    styleOption: Object,
    width: String,
    color: String
}

export type TitlePropsType = ExtractPropTypes<typeof titleProps>;