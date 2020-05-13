# vue-reactive-error-handler
[![npm version](https://badge.fury.io/js/vue-reactive-error-handler.svg)](https://www.npmjs.com/package/vue-reactive-error-handler)
[![GitHub Actions](https://github.com/odanado/vue-reactive-error-handler/workflows/Node%20CI/badge.svg)](https://github.com/odanado/vue-reactive-error-handler)


You can reactively handle errors raised by `Vue.config.errorHandler`.

## Install
```console
$ yarn add vue-reactive-error-handler
```

## Usage
```ts
import { ReactiveErrorHandler } from "vue-reactive-error-handler";

Vue.use(ReactiveErrorHandler);
```

```vue
<template>
  <div>
    error: <span v-if="$error.value">{{ $error.value.message }}</span>
  </div>
</template>
```

## Example
See `example` directory.