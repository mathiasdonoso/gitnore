const gitnore = require('./src/gitnore')

const main = () => {
  const args = process.argv.slice(1)
  const filename = args[1].toLowerCase()

  gitnore(filename)
}

main()
