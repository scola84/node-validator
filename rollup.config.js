import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  dest: './dist/validator.js',
  entry: 'index.js',
  external: [
    '@scola/core'
  ],
  format: 'cjs',
  plugins: [
    resolve({
      jsnext: true
    }),
    buble()
  ]
};
