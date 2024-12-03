/* eslint-disable @typescript-eslint/no-namespace */
import {Command, Flags, Interfaces} from '@oclif/core'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<(typeof BaseCommand)['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static override baseFlags = {}

  protected args!: Args<T>
  protected flags!: Flags<T>

  protected verbosity!: number

  public async init(): Promise<void> {
    await super.init()
    const {args, flags} = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      enableJsonFlag: this.ctor.enableJsonFlag,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as Flags<T>
    this.args = args as Args<T>
  }
}

export abstract class BaseCommandWithVerbosity<T extends typeof Command> extends BaseCommand<T> {
  static override baseFlags = {
    ...super.baseFlags,
    verbose: Flags.boolean({
      char: 'v',
      summary: 'Verbosity level',
      description: 'Can be used multiple times',
      default: false,
    }),
  } as const

  protected declare flags: BaseCommandWithVerbosity.Flags<T>

  protected verbosity = 0

  public override async init(): Promise<void> {
    await super.init()

    if (this.flags.verbose) {
      for (const arg of this.argv) {
        if (arg === '--verbose') this.verbosity += 1
        if (/^-v+$/.test(arg)) this.verbosity += arg.length - 1
      }

      console.log(`Verbosity: ${this.verbosity}`)
    }
  }
}

export namespace BaseCommandWithVerbosity {
  export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
    (typeof BaseCommandWithVerbosity)['baseFlags'] & T['flags']
  >
}
