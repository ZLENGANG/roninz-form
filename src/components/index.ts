import { App, AsyncComponentLoader, defineAsyncComponent } from 'vue';
const components = import.meta.glob('./**/index.vue');

export default function install(app: App) {
  for (let key in components) {
    const name = key.split('/')[1];
    app.component(
      name,
      defineAsyncComponent(components[key] as AsyncComponentLoader)
    );
  }
}