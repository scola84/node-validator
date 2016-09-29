import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: './dist/validator.js',
  format: 'cjs',
  plugins: [
    buble(),
    resolve({
      'jsnext:main': true
    })
  ]
};
