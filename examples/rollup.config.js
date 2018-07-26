import serve from 'rollup-plugin-serve'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import json from 'rollup-plugin-json'
import './env'

export default {
  entry: 'web/example.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
    // json(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {module: 'ES2015'}
      }
    }),
    resolve({
      browser: true
    }),
    commonjs(),
    replace({
      'process.env.E2E_TEST_URL': JSON.stringify( process.env.E2E_TEST_URL ),
      'process.env.E2E_TEST_PUBLIC_KEY': JSON.stringify( process.env.E2E_TEST_PUBLIC_KEY ),
      'process.env.E2E_TEST_PRIVATE_KEY': JSON.stringify( process.env.E2E_TEST_PRIVATE_KEY ),
    }),
    serve({
      contentBase: ['dist', 'web'],
      host: 'localhost',
      port: 10001,
    })
  ]
}
