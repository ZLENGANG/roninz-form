import { App, Component } from "vue";
import { componentPrefix, innerComponents, CompType } from "./r-form";
import { globalComponents } from "./components";

const RoninzForm = {
  install(app: App, customerComponents: { [key: string]: Component } = {}) {
    const components = {
      ...globalComponents,
      ...innerComponents,
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
export * from "./components";
