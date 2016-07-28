import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [
    resolve({
      jsnext: true
    }),
    babel({
      // presets: ['es2015-rollup']
    })
  ]
};
