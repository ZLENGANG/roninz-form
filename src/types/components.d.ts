import RForm from "../components/r-form/index.vue";
import RTable from "../components/r-table/index.vue";
import RRadio from "../components/r-radio/index.vue";
import RCheckbox from "../components/r-checkbox/index.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RForm: typeof RForm;
    RTable: typeof RTable;
    RRadio: typeof RRadio;
    RCheckbox: typeof RCheckbox;
  }
}
