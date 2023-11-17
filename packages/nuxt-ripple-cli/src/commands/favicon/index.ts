import commander from 'commander'
import favicon from './favicon'

export default function rplFaviconCommand() {
  const rplFaviconCommand = new commander.Command('favicon')

  rplFaviconCommand
    .description('Generate favicon assets')
    .option(
      '-a, --apiKey <apiKey>',
      'API key for the RealFaviconGenerator service'
    )
    .option('-b, --baseUrl <baseUrl>', 'Tide API base url')
    .option('-i, --siteId <siteId>', 'Tide site ID')
    .option(
      '-x, --extraPath <extraPath>',
      'Extra path directory, this defaults to blank for production sites',
      ''
    )
    .parse(process.argv)
    .action(() => favicon(rplFaviconCommand.opts()))

  return rplFaviconCommand
}
