import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  output: [
    {
      file: 'rollup-module.js',
      format: 'es'
    }
  ],
  plugins: [
    commonjs({
      namedExports: {
        './third-party-project/wp-bundle.js': [ 'Named' ],
        './third-party-project/wp-index.js': [ 'Named' ]
      }
    }),
    resolve()
  ]
}
