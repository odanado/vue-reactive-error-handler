import Vue, { PluginObject } from "vue";

export type OnError = (err: Error, vm: Vue, info: string) => void | boolean;

export type Options = {
  timeout?: number;
  onError?: OnError;
};

// TODO: change type
export type State = {
  error?: Error;
};

declare module "vue/types/vue" {
  interface Vue {
    $error: State;
  }
}

export const state = Vue.observable<State>({});

export const plugin: PluginObject<Options> = {
  install(Vue, options) {
    Vue.prototype.$error = state;

    // TODO: backup origin errorHandler

    Vue.config.errorHandler = (err, vm, info): void | boolean => {
      state.error = err;

      setTimeout(() => {
        state.error = undefined;
      }, options?.timeout || 3000);

      if (options?.onError) {
        return options.onError(err, vm, info);
      }

      return true;
    };
  }
};
