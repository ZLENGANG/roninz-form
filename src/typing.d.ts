import RForm from './components/r-form/index.vue';
import RTable from './components/r-table/index.vue';
const components = import.meta.glob('./components/index.ts');


declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RForm: typeof RForm;
    RTable: typeof RTable;
  }
}
