// import { App, AsyncComponentLoader, defineAsyncComponent } from 'vue';
// const components = import.meta.glob('./*/index.vue');

// export default function install(app: App) {
//   for (let key in components) {
//     const name = key.split('/')[1];
//     app.component(
//       name,
//       defineAsyncComponent(components[key] as AsyncComponentLoader)
//     );
//   }
// }

import { App, Component } from 'vue';

import RCheckbox from './r-checkbox/index.vue';
import RUpload from './r-upload/index.vue';
import RForm from './r-form/index.vue';
import RRadio from './r-radio/index.vue';
import RTable from './r-table/index.vue';

const components: Record<string, Component> = {
  'r-checkbox': RCheckbox,
  'r-upload': RUpload,
  'r-form': RForm,
  'r-radio': RRadio,
  'r-table': RTable,
};

export default function install(app: App) {
  for (let key in components) {
    app.component(key, components[key]);
  }
}
