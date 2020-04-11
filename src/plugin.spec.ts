import Vue, { VNode } from "vue";
import { plugin } from "./plugin";

Vue.use(plugin);

jest.useFakeTimers();

describe("plugin", (): void => {
  // TODO: iikanjini
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
  const vm = new Vue({
    render: (h): VNode => h(App)
  }).$mount();

  it("should be correct", async (): Promise<void> => {
    (vm.$children[0].$refs as any).button.click();

    // TODO: $error.error :(
    expect(vm.$error.error).toBeUndefined();
    await vm.$nextTick();
    // for node 10
    await new Promise(resolve => process.nextTick(resolve));
    expect(vm.$error.error).toBeDefined();
    expect(vm.$error.error).toEqual(expected);

    jest.runAllTimers();

    expect(vm.$error.error).toBeUndefined();
  });
});
