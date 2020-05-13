# vue-reactive-error-handler
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