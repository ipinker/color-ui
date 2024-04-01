import Bg from "./components/Bg/index.vue"
import Button from "./components/Button/index.vue"
import Calendar from "./components/Calendar/index.vue"
import Card from "./components/Card/index.vue"
import Cascader from "./components/Cascader/index.vue"
import Cell from "./components/Cell/index.vue"
import Check from "./components/Check/index.vue"
import CheckGroup from "./components/CheckGroup/index.vue"
import Col from "./components/Col/index.vue"
import Collapse from "./components/Collapse/index.vue"
import Color from "./components/Color/index.vue"
import CountDown from "./components/CountDown/index.vue"
import Date from "./components/Date/index.vue"
import Dialog from "./components/Dialog/index.vue"
import Drawer from "./components/Drawer/index.vue"
import Editor from "./components/Editor/index.vue"
import Empty from "./components/Empty/index.vue"
import Form from "./components/Form/index.vue"
import FormItem from "./components/FormItem/index.vue"
import Grid from "./components/Grid/index.vue"
import GridItem from "./components/GridItem/index.vue"
import Icon from "./components/Icon/index.vue"
import Img from "./components/Img/index.vue"
import IndexList from "./components/IndexList/index.vue"
import Input from "./components/Input/index.vue"
import Loading from "./components/Loading/index.vue"
import LoadMore from "./components/LoadMore/index.vue"
import Longpress from "./components/Longpress/index.vue"
import NavigationBar from "./components/NavigationBar/index.vue"
import Number from "./components/Number/index.vue"
import Page from "./components/Page/index.vue"
import Pagination from "./components/Pagination/index.vue"
import Picker from "./components/Picker/index.vue"
import Popup from "./components/Popup/index.vue"
import Progress from "./components/Progress/index.vue"
import Radio from "./components/Radio/index.vue"
import RadioGroup from "./components/RadioGroup/index.vue"
import Rate from "./components/Rate/index.vue"
import Result from "./components/Result/index.vue"
import Rich from "./components/Rich/index.vue"
import Row from "./components/Row/index.vue"
import Search from "./components/Search/index.vue"
import Select from "./components/Select/index.vue"
import Sheet from "./components/Sheet/index.vue"
import Slider from "./components/Slider/index.vue"
import Space from "./components/Space/index.vue"
import Steps from "./components/Steps/index.vue"
import Switch from "./components/Switch/index.vue"
import Tab from "./components/Tab/index.vue"
import Tabbar from "./components/Tabbar/index.vue"
import Table from "./components/Table/index.vue"
import ThemeButton from "./components/ThemeButton/index.vue"
import FloatButton from "./components/FloatButton/index.vue"
import TimeLine from "./components/TimeLine/index.vue"
import Tip from "./components/Tip/index.vue"
import Title from "./components/Title/index.vue"
import Transition from "./components/Transition/index.vue"
import Upload from "./components/Upload/index.vue"
import VerifyCode from "./components/Upload/index.vue"

// GlobalComponents for Volar
declare module '@vue/runtime-core'{
    // 3. 给 vue  添加全局组件类型，interface 和之前的合并
    export interface GlobalComponents {
        IBg: typeof Bg,
        IButton: typeof Button,
        ICalendar: typeof Calendar,
        ICard: typeof Card,
        ICascader: typeof Cascader,
        ICell: typeof Cell,
        ICheck: typeof Check,
        ICheckGroup: typeof CheckGroup,
        ICol: typeof Col,
        ICollapse: typeof Collapse,
        IColor: typeof Color,
        ICountDown: typeof CountDown,
        IDate: typeof Date,
        IDialog: typeof Dialog,
        IDrawer: typeof Drawer,
        IEditor: typeof Editor,
        IEmpty: typeof Empty,
        IForm: typeof Form,
        IFormItem: typeof FormItem,
        IGrid: typeof Grid,
        IGridItem: typeof GridItem,
        IIcon: typeof Icon,
        IImg: typeof Img,
        IIndexList: typeof IndexList,
        IInput: typeof Input,
        ILoading: typeof Loading,
        ILoadMore: typeof LoadMore,
        ILongpress: typeof Longpress,
        INavigationBar: typeof NavigationBar,
        INumber: typeof Number,
        IPage: typeof Page,
        IPagination: typeof Pagination,
        IPicker: typeof Picker,
        IPopup: typeof Popup,
        IProgress: typeof Progress,
        IRadio: typeof Radio,
        IRadioGroup: typeof RadioGroup,
        IRate: typeof Rate,
        IResult: typeof Result,
        IRich: typeof Rich,
        IRow: typeof Row,
        ISearch: typeof Search,
        ISelect: typeof Select,
        ISheet: typeof Sheet,
        ISlider: typeof Slider,
        ISpace: typeof Space,
        ISteps: typeof Steps,
        ISwitch: typeof Switch,
        ITab: typeof Tab,
        ITabbar: typeof Tabbar,
        ITable: typeof Table,
        IThemeButton: typeof ThemeButton,
        IFloatButton: typeof FloatButton,
        ITimeLine: typeof TimeLine,
        ITip: typeof Tip,
        ITitle: typeof Title,
        ITransition: typeof Transition,
        IUpload: typeof Upload,
        IVerifyCode: typeof VerifyCode,
    }

    interface ComponentCustomProperties {

    }
}

export {}