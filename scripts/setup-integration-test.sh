#!/usr/bin/env zsh

set -eu

dir=$1

rm -rf $dir/lib
rm -rf $dir/dist
cp -r src/ $dir/lib
rm $dir/lib/*.spec.ts

cd $dir

yarn
yarn build
