import {Command, execute} from '@oclif/core'

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

export async function run() {
  await execute({dir: import.meta.url})
}
