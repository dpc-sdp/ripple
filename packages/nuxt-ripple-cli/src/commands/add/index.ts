import commander from 'commander'
import add from './add'

export default function rplAddCommand() {
  const rplAddCommand = new commander.Command('add')

  rplAddCommand
    .command('component')
    .argument(
      '[directory]',
      `project directory, default is ${process.cwd() + '/components'}`,
      process.cwd() + '/components'
    )
    .description('Scaffold ripple component')
    .option(
      '--name [name]',
      'component name eg: modal. Prefix will be added separately with --prefix option'
    )
    .option(
      '--prefix [prefix]',
      'lowercase component prefix: eg: rpl, tide, vic. Rpl should be reserved for components that are maintained by the SDP team.',
      'rpl'
    )
    .action((directory, options) => {
      add('component', directory, options)
    })

  rplAddCommand
    .command('content-type')
    .description('Scaffold ripple content type')
    .argument('[directory]', 'project directory, default is CWD', process.cwd())
    .option('--name [name]', 'name of content type')
    .action((directory, options) => {
      add('content-type', directory, options)
    })

  return rplAddCommand
}
