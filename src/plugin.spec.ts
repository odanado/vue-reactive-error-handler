import Vue from "vue";

import { plugin } from "./plugin";

jest.useFakeTimers();

async function wait(app: Vue): Promise<void> {
  await app.$nextTick();
  // for node 10
  await new Promise(resolve => process.nextTick(resolve));
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function setup(expectedError: Error) {
  // TODO: use localVue of @vue/test-utils

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Vue as any)._installedPlugins = [];
  Vue.use(plugin);
  const App = Vue.extend({
    methods: {
      async click(): Promise<void> {
        throw expectedError;
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
  const button = app.$refs.button;

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error("$refs.button isn't HTMLButtonElement");
  }
  return { app, button };
}

describe("plugin", (): void => {
  // TODO: move to util file
  const expectedError = new Error("expected error");

  let { app, button } = setup(expectedError);

  beforeEach(() => {
    app = setup(expectedError).app;
    button = setup(expectedError).button;
  });

  afterEach(() => {
    delete Vue.config.errorHandler;
  });

  it("should be correct", async (): Promise<void> => {
    button.click();

    expect(app.$error.value).toBeUndefined();

    await wait(app);

    expect(app.$error.value).toBeDefined();
    expect(app.$error.value).toEqual(expectedError);

    jest.runAllTimers();

    expect(app.$error.value).toBeUndefined();
  });

  describe("when errorHandler already exists", () => {
    let errorHandler: typeof Vue.config.errorHandler;
    beforeEach(() => {
      errorHandler = jest.fn();
      Vue.config.errorHandler = errorHandler;

      app = setup(expectedError).app;
      button = setup(expectedError).button;
    });

    it("should be call original errorHandler", async () => {
      button.click();

      await wait(app);
      expect(app.$error.value).toBeDefined();

      expect(errorHandler).toBeCalled();
      expect(errorHandler).toBeCalledWith(
        expectedError,
        expect.anything(),
        expect.anything()
      );
    });
  });
});
