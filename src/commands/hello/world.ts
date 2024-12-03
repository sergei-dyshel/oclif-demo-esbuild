import {Command, Flags} from '@oclif/core'

export default class World extends Command {
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
    const {flags} = await this.parse(World)
    this.log(`hello ${flags.whose} ${flags.type} world no. ${flags.num}`)
  }
}
