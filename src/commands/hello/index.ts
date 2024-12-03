import {Args, Flags} from '@oclif/core'

import {BaseCommandWithVerbosity} from '../base'

export default class Hello extends BaseCommandWithVerbosity<typeof Hello> {
  static args = {
    person: Args.string({description: 'Person to say hello to', required: true}),
  }

  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Who is saying hello', default: 'me'}),
  }

  async run(): Promise<void> {
    this.log(`hello ${this.args.person} from ${this.flags.from}! (./src/commands/hello/index.ts)`)
  }
}
