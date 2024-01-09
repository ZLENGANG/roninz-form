import RForm from "../components/r-form/index.vue";
import RTable from "../components/r-table/index.vue";
import RSelect from "../components/r-select/index.vue";
import RRadio from "../components/r-radio/index.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RForm: typeof RForm;
    RTable: typeof RTable;
    RSelect: typeof RSelect;
    RRadio: typeof RRadio;
  }
}
