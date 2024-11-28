const {build} = require('esbuild')
build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  // format: 'esm',
  // inject: ['./bin/cjs-shims.js'],
  outdir: './dist',
  external: ['oclif', '@oclif/core'],
  sourcemap: 'inline',
  platform: 'node',
  plugins: [],
})
