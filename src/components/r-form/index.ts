import RForm from "./src/index.vue";
import type { FormComponents } from "./src/type";

import RCheckbox from "../r-checkbox/index";
import RUpload from "../r-upload/index";
import RRadio from "../r-radio/index";
import {
  ElAutocomplete,
  ElCascader,
  ElColorPicker,
  ElInput,
  ElInputNumber,
  ElSelectV2,
  ElDatePicker,
  ElRate,
  ElSlider,
  ElSwitch,
  ElTransfer,
  ElCalendar,
  ElTreeSelect,
} from "element-plus";

export const formComponents: FormComponents = {
  checkbox: RCheckbox,
  upload: RUpload,
  radio: RRadio,

  autocomplete: ElAutocomplete,
  cascader: ElCascader,
  color: ElColorPicker,
  input: ElInput,
  textarea: ElInput,
  "input-number": ElInputNumber,
  select: ElSelectV2,
  date: ElDatePicker,
  rate: ElRate,

  slider: ElSlider,
  switch: ElSwitch,
  transfer: ElTransfer,
  calendar: ElCalendar,
  "tree-select": ElTreeSelect,
};

export const componentPrefix = "r-";

export default RForm;

export * from './src/type'
