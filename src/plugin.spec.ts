import Vue from "vue";

import { plugin } from "./plugin";

Vue.use(plugin);

jest.useFakeTimers();

describe("plugin", (): void => {
  // TODO: move to util file
  const expected = new Error("expected error");
  const App = Vue.extend({
    methods: {
      async click(): Promise<void> {
        throw expected;
      }
    },
    render(h) {
      return h("button", {
        on: {
          click: async (): Promise<void> => {
            await this.click();
          }
        },
        ref: "button"
      });
    }
  });
  const app = new App();
  app.$mount();

  it("should be correct", async (): Promise<void> => {
    const button = app.$refs.button;
    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("$refs.button isn't HTMLButtonElement");
    }
    button.click();

    expect(app.$error.value).toBeUndefined();

    await app.$nextTick();
    // for node 10
    await new Promise(resolve => process.nextTick(resolve));

    expect(app.$error.value).toBeDefined();
    expect(app.$error.value).toEqual(expected);

    jest.runAllTimers();

    expect(app.$error.value).toBeUndefined();
  });
});
