import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json');

const libraryName = 'gatecoin-client';

export default [
  // node
  {
    input: `src/node-client.ts`,
    output: [
      { file: pkg.main, name: camelCase(libraryName), format: 'cjs', sourcemap: true, exports: 'named' },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['node-fetch', 'crypto-js', 'query-string'],
    plugins: [
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps(),
    ],
  },
  // browser
  {
    input: `src/browser-client.ts`,
    output: [
      { file: pkg.browser, name: camelCase(libraryName), format: 'umd', sourcemap: true, exports: 'named'  },
    ],
    plugins: [
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({browser: true}),

      // Resolve source maps to the original source
      sourceMaps(),
    ],
  }
]
