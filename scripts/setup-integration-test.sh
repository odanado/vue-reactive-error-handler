#/bin/bash

set -eu

DIR=./test/fixture/vue-app

rm -rf $DIR/lib
rm -rf $DIR/dist
cp -r src/ $DIR/lib
rm $DIR/lib/*.spec.ts

pushd $DIR

yarn
yarn build
