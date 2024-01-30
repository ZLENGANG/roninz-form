import RForm from "../components/r-form/index";
import RTable from "../components/r-table/index";
import RRadio from "../components/r-radio/index";
import RCheckbox from "../components/r-checkbox/index";
import RUpload from "../components/r-upload/index";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RForm: typeof RForm;
    RTable: typeof RTable;
    RRadio: typeof RRadio;
    RCheckbox: typeof RCheckbox;
    RUpload: typeof RUpload;
  }
}
