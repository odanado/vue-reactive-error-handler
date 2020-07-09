import Vue, { PluginObject } from "vue";
import { State } from "./state";
import { Options } from "./options";
import { createErrorHandler } from "./error-handler";

export type VueErrorHandler = (
  error: Error,
  vm: Vue,
  info: string
) => void | boolean;

export const state = Vue.observable<State>({ value: undefined });

export const plugin: PluginObject<Options> = {
  install(Vue, options) {
    Vue.prototype.$error = state;

    const originalErrorHandler = Vue.config.errorHandler;

    const errorHandler: VueErrorHandler = (err, vm, info): void | boolean => {
      createErrorHandler(state, options)(err);
      if (originalErrorHandler) {
        return originalErrorHandler(err, vm, info);
      }
      return true;
    };

    Vue.config.errorHandler = errorHandler;
  }
};

declare module "vue/types/vue" {
  interface Vue {
    $error: State;
  }
}
