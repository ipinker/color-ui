import { BgComponentType } from "./components/Bg"
import {ButtonComponentType} from "./components/Button"
import {CalendarComponentType} from "./components/Calendar"
import {CardComponentType} from "./components/Card"
import {CascaderComponentType} from "./components/Cascader"
import {CellComponentType} from "./components/Cell"
import {CheckComponentType} from "./components/Check"
import {CheckGroupComponentType} from "./components/CheckGroup"
import {ColComponentType} from "./components/Col"
import {CollapseComponentType} from "./components/Collapse"
import {ColorComponentType} from "./components/Color"
import {CountDownComponentType} from "./components/CountDown"
import {DateComponentType} from "./components/Date"
import {DialogComponentType} from "./components/Dialog"
import {DrawerComponentType} from "./components/Drawer"
import {EditorComponentType} from "./components/Editor"
import {EmptyComponentType} from "./components/Empty"
import {FormComponentType} from "./components/Form"
import {FormItemComponentType} from "./components/FormItem"
import {GridComponentType} from "./components/Grid"
import {GridItemComponentType} from "./components/GridItem"
import {IconComponentType} from "./components/Icon"
import {ImgComponentType} from "./components/Img"
import {IndexListComponentType} from "./components/IndexList"
import {InputComponentType} from "./components/Input"
import {LoadingComponentType} from "./components/Loading"
import {LoadMoreComponentType} from "./components/LoadMore"
import {LongpressComponentType} from "./components/Longpress"
import {NavigationBarComponentType} from "./components/NavigationBar"
import {NumberComponentType} from "./components/Number"
import {PageComponentType} from "./components/Page"
import {PaginationComponentType} from "./components/Pagination"
import {PickerComponentType} from "./components/Picker"
import {PopupComponentType} from "./components/Popup"
import {ProgressComponentType} from "./components/Progress"
import {RadioComponentType} from "./components/Radio"
import {RadioGroupComponentType} from "./components/RadioGroup"
import {RateComponentType} from "./components/Rate"
import {ResultComponentType} from "./components/Result"
import {RichComponentType} from "./components/Rich"
import {RowComponentType} from "./components/Row"
import {SearchComponentType} from "./components/Search"
import {SelectComponentType} from "./components/Select"
import {SheetComponentType} from "./components/Sheet"
import {SliderComponentType} from "./components/Slider"
import {SpaceComponentType} from "./components/Space"
import {StepsComponentType} from "./components/Steps"
import {SwitchComponentType} from "./components/Switch"
import {TabComponentType} from "./components/Tab"
import {TabbarComponentType} from "./components/Tabbar"
import {TableComponentType} from "./components/Table"
import {ThemeButtonComponentType} from "./components/ThemeButton"
import {FloatButtonComponentType} from "./components/FloatButton"
import {TimeLineComponentType} from "./components/TimeLine"
import {TipComponentType} from "./components/Tip"
import {TitleComponentType} from "./components/Title"
import {TransitionComponentType} from "./components/Transition"
import {UploadComponentType} from "./components/Upload"
import { VerifyCodeComponentType } from "./components/VerifyCode"

// GlobalComponents for Volar
declare module '@vue/runtime-core'{
    // 3. 给 vue  添加全局组件类型，interface 和之前的合并
    export interface GlobalComponents {
        IBg: BgComponentType,
        IButton: ButtonComponentType,
        ICalendar: CalendarComponentType,
        ICard: CardComponentType,
        ICascader: CascaderComponentType,
        ICell: CellComponentType,
        ICheck: CheckComponentType,
        ICheckGroup: CheckGroupComponentType,
        ICol: ColComponentType,
        ICollapse: CollapseComponentType,
        IColor: ColorComponentType,
        ICountDown: CountDownComponentType,
        IDate: DateComponentType,
        IDialog: DialogComponentType,
        IDrawer: DrawerComponentType,
        IEditor: EditorComponentType,
        IEmpty: EmptyComponentType,
        IForm: FormComponentType,
        IFormItem: FormItemComponentType,
        IGrid: GridComponentType,
        IGridItem: GridItemComponentType,
        IIcon: IconComponentType,
        IImg: ImgComponentType,
        IIndexList: IndexListComponentType,
        IInput: InputComponentType,
        ILoading: LoadingComponentType,
        ILoadMore: LoadMoreComponentType,
        ILongpress: LongpressComponentType,
        INavigationBar: NavigationBarComponentType,
        INumber: NumberComponentType,
        IPage: PageComponentType,
        IPagination: PaginationComponentType,
        IPicker: PickerComponentType,
        IPopup: PopupComponentType,
        IProgress: ProgressComponentType,
        IRadio: RadioComponentType,
        IRadioGroup: RadioGroupComponentType,
        IRate: RateComponentType,
        IResult: ResultComponentType,
        IRich: RichComponentType,
        IRow: RowComponentType,
        ISearch: SearchComponentType,
        ISelect: SelectComponentType,
        ISheet: SheetComponentType,
        ISlider: SliderComponentType,
        ISpace: SpaceComponentType,
        ISteps: StepsComponentType,
        ISwitch: SwitchComponentType,
        ITab: TabComponentType,
        ITabbar: TabbarComponentType,
        ITable: TableComponentType,
        IThemeButton: ThemeButtonComponentType,
        IFloatButton: FloatButtonComponentType,
        ITimeLine: TimeLineComponentType,
        ITip: TipComponentType,
        ITitle: TitleComponentType,
        ITransition: TransitionComponentType,
        IUpload: UploadComponentType,
        IVerifyCode: VerifyCodeComponentType,
    }

    interface ComponentCustomProperties {

    }
}

export {}