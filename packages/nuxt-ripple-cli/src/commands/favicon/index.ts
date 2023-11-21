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
      '-p, --publicPath <publicPath>',
      'Absolute path to public directory',
      `${process.cwd()}/public`
    )
    .parse(process.argv)
    .action(() => favicon(rplFaviconCommand.opts()))

  return rplFaviconCommand
}
