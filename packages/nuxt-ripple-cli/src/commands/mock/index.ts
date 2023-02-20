import commander from 'commander'
import mockserver from './mockserver'

export default function rplMockCommand() {
  const rplMockCommand = new commander.Command('mock')

  rplMockCommand
    .description(
      `
      Starts a mock server for testing Ripple sites without Tide backend.
    `
    )
    .argument('[fixturePath]', 'fixturePath', './fixtures')
    .option(
      '-R --routes [routePath]',
      `
        Relative path to routes definition file. Should be a JSON file that exports an array of routes. EG:
        [
          {
            "path": "/",
            "fixture": "landingPage/home.json"
          }
        ]

      `,
      'routes.json'
    )
    .option(
      '-S --site [sitePath]',
      'relative path to site fixture',
      './fixtures/site.json'
    )
    .action((fixturePath, { routes, site }) => {
      mockserver(fixturePath, routes, site)
    })
  return rplMockCommand
}
