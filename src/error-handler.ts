import { State } from "./state";
import { Options } from "./options";

export type ErrorHandler = (error: Error) => void;

export function createErrorHandler(
  state: State,
  options?: Options
): ErrorHandler {
  return (error: Error): void => {
    state.value = error;

    if (options?.timeout) {
      setTimeout(() => {
        state.value = undefined;
      }, options.timeout);
    }

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  };
}
