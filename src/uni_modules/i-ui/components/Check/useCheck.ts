import {CheckEmitsType, CheckPropsType} from "./check";
import {SetupContext} from "@vue/runtime-core";
import {UPDATE_MODEL_EVENT, SizeType} from "../../common/constants";

export default (props: CheckPropsType, emits: SetupContext<CheckEmitsType>['emit']) => {
    const checkRef = ref(null);
    const checkGroup: any = inject("CheckGroupKey", undefined);
    const isGroup = computed(() => !!checkGroup);
    const disabled = computed(() => checkGroup?.disabled);
    const size = computed(() => checkGroup?.size);
    const mini = computed(() => checkGroup?.mini);
    const activeColor = computed(() => checkGroup?.activeColor);
    const inactiveColor = computed(() => checkGroup?.inactiveColor);
    const modelValue = computed<CheckPropsType['modelValue']>({
        get() {
          return isGroup.value ? (checkGroup!.modelValue || []).includes(props.value) : props.modelValue
        },
        set(val) {
            if (isGroup.value) {
                checkGroup!.changeEvent(props.value);
            } else {
                emits && emits(UPDATE_MODEL_EVENT, val);
            }
        },
    });
    return {
        checkRef,
        isGroup,
        checkGroup,
        size,
        mini,
        disabled,
        modelValue,
        activeColor,
        inactiveColor
    };
}
