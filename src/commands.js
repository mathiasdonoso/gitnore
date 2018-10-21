#! /usr/bin/env node
const yargs = require('yargs')
const gitnore = require('./gitnore')

const argv = yargs
  .option('add', {
    'description': 'Add other global files to .gitignore',
    'required': false,
    'type': 'string'
  })
  .help()
  .alias('help', 'h')
  .epilog('for more information visit https://github.com/mathiasdonoso/gitnore')
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
  .argv

if (argv._[0]) {
  const filename = argv._[0].toLowerCase()

  gitnore.createFile(filename)

  if (argv.add) {
    const options = argv.add.split(',')
    for (let option of options) {
      gitnore.addToGitignore(option.toLowerCase())
    }
  }
}
