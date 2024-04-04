import {RadioEmitsType, RadioPropsType} from "./radio";
import {SetupContext} from "@vue/runtime-core";
import {ref, computed, inject} from "vue"
import {UPDATE_MODEL_EVENT, SizeType} from "../../common/constants";

export default (props: RadioPropsType, emits: SetupContext<RadioEmitsType>['emit']) => {
    const radioRef = ref(null);
    const radioGroup: any = inject("RadioGroupKey", undefined);
    const isGroup = computed(() => !!radioGroup);
    const size = computed(() => radioGroup?.size);
    const disabled = computed(() => radioGroup?.disabled);
    const mini = computed(() => radioGroup?.mini);
    const activeColor = computed(() => radioGroup?.activeColor);
    const modelValue = computed<RadioPropsType['modelValue']>({
        get() {
          return isGroup.value ? radioGroup!.modelValue : props.modelValue!
        },
        set(val) {
            if (isGroup.value) {
                radioGroup!.changeEvent(val);
            } else {
                emits && emits(UPDATE_MODEL_EVENT, val);
            }
        },
    });
    return {
        radioRef,
        isGroup,
        radioGroup,
        size,
        mini,
        disabled,
        modelValue,
        activeColor
    };
}
