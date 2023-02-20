#!/usr/bin/env node
import commander from 'commander'
import rplMockCommand from './mock'
import rplInitCommand from './init'
import rplAddCommand from './add'

const program = new commander.Command('ripple')

const rippleCli = program
  .name('Ripple CLI')
  .description('CLI Tools for scaffolding Ripple SDP sites and modules')
  .version('0.0.1')

rippleCli.addCommand(rplMockCommand())
rippleCli.addCommand(rplInitCommand())
rippleCli.addCommand(rplAddCommand())
// TODO Add update command for existing sites

program.parse(process.argv)
