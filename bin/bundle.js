const {build, analyzeMetafile} = require('esbuild')
const fs = require('node:fs')

// eslint-disable-next-line unicorn/prefer-top-level-await
;(async () => {
  const result = await build({
    bundle: true,
    entryPoints: ['./src/index.ts'],
    outfile: './dist/oclif-demo',
    external: ['typescript'],
    sourcemap: 'inline',
    platform: 'node',
    plugins: [],
    metafile: true,
    banner: {
      js: `#!/bin/bash\n":" //# comment; exec /usr/bin/env node \${INSPECT:+--inspect} \${INSPECT_BRK:+--inspect-brk} "$0" "$@"`,
    },
  })

  fs.chmodSync('dist/oclif-demo', 0o755)

  const analysis = await analyzeMetafile(result.metafile, {
    verbose: true,
  })

  // console.log(analysis)
  analysis
})()
