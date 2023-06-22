import commander from 'commander'
import add from './add'

export default function rplAddCommand() {
  const rplAddCommand = new commander.Command('add')

  rplAddCommand
    .command('component')
    .description('Scaffold a Ripple component')
    .argument(
      '[directory]',
      `project directory, default is ${process.cwd() + '/components'}`,
      process.cwd() + '/components'
    )
    .option(
      '--name [name]',
      'The components name eg: modal. Note: a prefix will be added separately with the --prefix option'
    )
    .option(
      '--prefix [prefix]',
      'A lowercase component prefix: eg: rpl, tide, vic. Rpl should be reserved for components that are maintained by the SDP team',
      'rpl'
    )
    .action((directory, options) => {
      add('component', directory, options)
    })

  rplAddCommand
    .command('content-type')
    .description('Scaffold a Ripple tide content type')
    .argument('[directory]', 'The project directory, this defaults to the current working directory (CWD)', process.cwd())
    .option('--name [name]', 'The name of content type')
    .option('-T --createTests', 'This will create Cypress test script examples')
    .option(
      '--cypressPath [cypressPath]',
      'The path to the Cypress support folder, this default to a folder called cypress',
      'cypress'
    )
    .action((directory, options) => {
      add('content-type', directory, options)
    })

  return rplAddCommand
}
