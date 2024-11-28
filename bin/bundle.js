const {build, analyzeMetafile} = require('esbuild')

// eslint-disable-next-line unicorn/prefer-top-level-await
;(async () => {
  const result = await build({
    bundle: true,
    entryPoints: ['./src/index.ts'],
    outdir: './dist',
    external: ['typescript'],
    sourcemap: 'inline',
    platform: 'node',
    plugins: [],
    metafile: true,
  })

  const analysis = await analyzeMetafile(result.metafile, {
    verbose: true,
  })

  // console.log(analysis)
  analysis
})()
