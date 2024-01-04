import RForm from "../components/r-form/index.vue";
import RTable from "../components/r-table/index.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RForm: typeof RForm;
    RTable: typeof RTable;
  }
}
