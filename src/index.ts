/* eslint-disable unicorn/prefer-module */
/* eslint-disable perfectionist/sort-objects */
import {Command, execute} from '@oclif/core'
import {LoadOptions} from '@oclif/core/interfaces'

import ESBuild from './commands/esbuild.js'
import Hello from './commands/hello/index.js'
import HelloWorld from './commands/hello/world.js'
export {default as INIT_HOOK} from './hooks/init/init.js'

export const COMMANDS: Record<string, Command.Class> = {
  esbuild: ESBuild,
  hello: Hello,
  'hello:alias': HelloWorld,
  'hello:world': HelloWorld,
}

export async function run(loadOptions?: LoadOptions) {
  // eslint-disable-next-line unicorn/prefer-module
  await execute({dir: __dirname, loadOptions})
}

// eslint-disable-next-line unicorn/prefer-top-level-await
run({
  root: __dirname,
  pjson: {
    name: 'mytool',
    version: 'v1.5',
    oclif: {
      bin: 'bundle',
      dirname: 'bundle',
      commands: {
        strategy: 'explicit',
        target: './index.js',
        identifier: 'COMMANDS',
      },
      topicSeparator: ' ',
      topics: {
        hello: {
          description: 'Say hello to the world and others',
        },
      },
      hooks: {
        init: [
          {
            target: './index.js',
            identifier: 'INIT_HOOK',
          },
        ],
      },
    },
  },
})
