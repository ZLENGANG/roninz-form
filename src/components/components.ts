import { Component } from "vue";
import RForm from "./r-form";
import RTable from "./r-table";

export const globalComponents: Record<string, Component> = {
  form: RForm,
  table: RTable,
};

export { RForm, RTable };
