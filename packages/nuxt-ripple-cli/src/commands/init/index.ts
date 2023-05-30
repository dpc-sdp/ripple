import commander from 'commander'
import init from './init'

export default function rplMockCommand() {
  const rplMockCommand = new commander.Command('init')

  rplMockCommand
    .description('Initialize a new Ripple project')
    .argument(
      '[directory]',
      'directory to init project into, default is CWD',
      process.cwd()
    )
    .argument(
      '[template]',
      'Template to use - site or layer currently',
      process.cwd()
    )
    .option('--name [name]', 'Project name: eg: example-vic-gov-au')
    .action((template, directory) => {
      init(template, directory)
      console.info(`
        New Ripple ${template} created in ${directory}.
        Run the following to get started:
          cd ${directory}
          npm install
          npm run dev
      `)
    })
  return rplMockCommand
}
