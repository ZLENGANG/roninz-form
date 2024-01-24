import { App, Component } from 'vue';

import RCheckbox from './r-checkbox/index.vue';
import RUpload from './r-upload/index.vue';
import RForm from './r-form/index.vue';
import RRadio from './r-radio/index.vue';
import RTable from './r-table/index.vue';
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
} from 'element-plus';
import type { CompType } from './r-form';

const globalComponents: Record<string, Component> = {
  form: RForm,
  table: RTable,
};

export const componentPrefix = 'r-';

export const formComponents: Record<keyof typeof CompType | string, Component> =
  {
    checkbox: RCheckbox,
    upload: RUpload,
    radio: RRadio,

    autocomplete: ElAutocomplete,
    cascader: ElCascader,
    color: ElColorPicker,
    input: ElInput,
    textarea: ElInput,
    'input-number': ElInputNumber,
    select: ElSelectV2,
    date: ElDatePicker,
    rate: ElRate,

    slider: ElSlider,
    switch: ElSwitch,
    transfer: ElTransfer,
    calendar: ElCalendar,
    'tree-select': ElTreeSelect,
  };

const RoninzForm = {
  install(app: App, customerComponents: { [key: string]: Component } = {}) {
    const components = {
      ...globalComponents,
      ...formComponents,
      ...customerComponents,
    };
    for (let key in components) {
      app.component(
        `${componentPrefix}${key}`,
        components[key as keyof typeof CompType]
      );
    }

    app.provide('customerComponents', customerComponents);
  },
};

export default RoninzForm;
