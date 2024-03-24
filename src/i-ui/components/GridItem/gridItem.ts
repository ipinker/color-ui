import { ExtractPropTypes } from "vue"

export const gridItemProps = {
    index: {
        type: [String, Number],
        default: 0
    }
}

export type GridItemPropsType = ExtractPropTypes< typeof gridItemProps >;