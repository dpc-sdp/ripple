import commander from 'commander'
import mockserver from './mockserver'

export default function rplMockCommand() {
  const rplMockCommand = new commander.Command('mock')

  rplMockCommand
    .description(
      `
      Starts a mock server for testing Ripple sites without Tide backend
    `
    )
    .argument('[fixturePath]', 'The path to the fixtures i.e. mocked data', './fixtures')
    .option(
      '-R --routes [routePath]',
      `
        Relative path to routes definition file, this should be a JSON file that exports an array of routes. eg:
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
      'The relative path to the site fixture, i,e. mocked global site data',
      './fixtures/site.json'
    )
    .action((fixturePath, { routes, site }) => {
      mockserver(fixturePath, routes, site)
    })
  return rplMockCommand
}
