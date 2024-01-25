import { App, Component } from "vue";

import RForm, { componentPrefix, formComponents, CompType } from "./r-form";
import RTable from "./r-table";

const globalComponents: Record<string, Component> = {
  form: RForm,
  table: RTable,
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

    app.provide("customerComponents", customerComponents);
  },
};

export default RoninzForm;
export * from "./r-form";
export * from "./r-table";
