import { PopupRefType } from "../Popup/popup";
import { AnyMap } from "../../index"
export function useCascader () {
    const cascaderRef: Ref<PopupRefType | null> = ref(null);
    let currentSelect: Ref<AnyMap | any> = ref(null),
        firstIndex: Ref<number> = ref(-1),
        
        
        secondChildren: Ref<AnyMap[] | null> = ref(null),
        secondIndex: Ref<number> = ref(-1),

        thirdChildren: Ref<AnyMap[] | null> = ref(null),
        thirdIndex: Ref<number> = ref(-1),
        
        lastChildren: Ref<AnyMap[] | null> = ref(null),
        lastIndex: Ref<number> = ref(-1);

    return toRefs({
        cascaderRef,
        currentSelect,
        firstIndex,
        secondChildren,
        secondIndex,
        thirdChildren,
        thirdIndex,
        lastChildren,
        lastIndex,
    });
}