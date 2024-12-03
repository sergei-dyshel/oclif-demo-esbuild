/* eslint-disable unicorn/prefer-module */
/* eslint-disable perfectionist/sort-objects */
import {Flags, Hook, Command as OclifCommand, execute} from '@oclif/core'
import {LoadOptions} from '@oclif/core/interfaces'
import * as PluginAutoComplete from '@sergei-dyshel/oclif-plugin-autocomplete-cjs'

import ESBuild from './commands/esbuild'
import Hello from './commands/hello/index'
import HelloWorld from './commands/hello/world'
import {default as INIT_HOOK} from './hooks/init/init'

// eslint-disable-next-line unicorn/prefer-export-from
export {INIT_HOOK}

for (const [_, cmd] of Object.entries(PluginAutoComplete.commands)) {
  cmd.hidden = true
}

export const COMMANDS: Record<string, OclifCommand.Class> = {
  ...PluginAutoComplete.commands,
  esbuild: ESBuild,
  hello: Hello,
  'hello:alias': HelloWorld,
  'hello:world': HelloWorld,
}

export const COMMAND_NOT_FOUND_HOOK: Hook.CommandNotFound = async function (opts) {
  console.log('Command not found')
  await opts.config.runCommand('hello:world', opts.argv)
}

export const PRERUN_HOOK: Hook.Prerun = async (opts) => {
  // console.log(opts.Command.id)
}

export async function run(loadOptions?: LoadOptions) {
  // eslint-disable-next-line unicorn/prefer-module
  await execute({dir: __dirname, loadOptions})
}

if (process.argv.length === 2) process.argv.push('hello:world')

export class Command extends OclifCommand {
  static args = {}

  static description = 'Say hello world'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    whose: Flags.option({
      char: 'w',
      summary: 'Whose world',
      description: 'Who the world belongs to',
      options: ['mine', 'yours'] as const,
      default: 'mine',
    })(),
    type: Flags.option({
      char: 't',
      summary: 'World type',
      description: 'Type of the world',
      options: ['wonderful', 'cruel'] as const,
      default: 'cruel',
    })(),
    num: Flags.integer({
      min: 1,
      max: 10,
      char: 'n',
      summary: 'World number',
      description: 'Think of something',
      default: 1,
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Command)
    this.log(`hello ${flags.whose} ${flags.type} world no. ${flags.num}`)
  }
}

Command
// eslint-disable-next-line unicorn/prefer-top-level-await
run({
  root: __dirname,
  pjson: {
    name: 'oclif-demo',
    version: 'v1.5',
    oclif: {
      bin: 'oclif-demo',
      commands: {
        strategy: 'explicit',
        // strategy: 'single',
        target: __filename,
        identifier: Object.keys({COMMANDS})[0],
      },
      topicSeparator: ' ',
      topics: {
        hello: {
          description: 'Say hello to the world and others',
        },
      },
      helpOptions: {
        flagSortOrder: 'none',
        maxWidth: 80,
      },
      hooks: {
        init: [
          {
            // target: './oclif-demo',
            target: __filename,
            identifier: Object.keys({INIT_HOOK})[0],
          },
        ],
        command_not_found: [
          {
            target: __filename,
            identifier: Object.keys({COMMAND_NOT_FOUND_HOOK})[0],
          },
        ],
        prerun: [
          {
            target: __filename,
            identifier: Object.keys({PRERUN_HOOK})[0],
          },
        ],
      },
    },
  },
})
