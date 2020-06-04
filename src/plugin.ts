import Vue, { PluginObject } from "vue";

export type Options = {
  timeout?: number;
};

export type State = {
  value?: Error;
};

declare module "vue/types/vue" {
  interface Vue {
    $error: State;
  }
}

export const state = Vue.observable<State>({ value: undefined });

export const plugin: PluginObject<Options> = {
  install(Vue, options) {
    Vue.prototype.$error = state;

    const originalErrorHandler = Vue.config.errorHandler;

    Vue.config.errorHandler = (err, vm, info): void | boolean => {
      state.value = err;

      if (options?.timeout) {
        setTimeout(() => {
          state.value = undefined;
        }, options?.timeout);
      }

      if (originalErrorHandler) {
        return originalErrorHandler(err, vm, info);
      }

      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }

      return true;
    };
  }
};
