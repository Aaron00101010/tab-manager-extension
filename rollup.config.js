import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import html from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy'
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.__DEV__ ?? false

export default {
  input: ['index.html'],
  output: {
    sourcemap: isDev,
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,
  cache: true,
  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: false,
      injectServiceWorker: false,
      serviceWorkerPath: 'dist/sw.js',
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS */
    isDev ? undefined : terser(),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    /** Compile JS to a lower language target */
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: [
              'last 3 Chrome major versions',
              'last 3 Firefox major versions',
              'last 3 Edge major versions',
              'last 3 Safari major versions',
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
    copy({
      targets: [
        { src: "src/manifest.json", dest: "dist" },
        { src: "out-tsc/src/background.js", dest: "dist" }
      ]
    })
  ],
};
