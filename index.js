#! /usr/bin/env node
const gitnore = require('./src/gitnore')

const main = () => {
  const args = process.argv.slice(process.execArgv.length + 2)
  const filename = args[0].toLowerCase()

  gitnore(filename)
}

main()
