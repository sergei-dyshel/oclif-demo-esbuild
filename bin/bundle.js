const {build} = await import('esbuild')
await build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  inject: ['./bin/cjs-shims.js'],
  loader: {'.node': 'copy'},
  outdir: './dist',
  platform: 'node',
  plugins: [],
})
