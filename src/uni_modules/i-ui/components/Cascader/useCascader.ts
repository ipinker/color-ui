import { Ref, ref, toRefs } from "vue"
import { PopupRefType } from "../Popup/popup";
import { AnyObject } from "../../type"
export function useCascader () {
    const cascaderRef: Ref<PopupRefType | null> = ref(null);
    let currentSelect: Ref<AnyObject | any> = ref(null),
        firstIndex: Ref<number> = ref(-1),
        
        
        secondChildren: Ref<AnyObject[] | null> = ref(null),
        secondIndex: Ref<number> = ref(-1),

        thirdChildren: Ref<AnyObject[] | null> = ref(null),
        thirdIndex: Ref<number> = ref(-1),
        
        lastChildren: Ref<AnyObject[] | null> = ref(null),
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