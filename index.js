const fs = require('fs')
const filesFolder = './assets/files/'

const main = () => {
  const args = process.argv.slice(1)
  const filename = args[1].toLowerCase()

  fs.readdir(filesFolder, (err, files) => {
    if (err) console.error(err)
    files.forEach(file => {
      const name = file.split('.')[0].toLowerCase()

      if (name === filename) {
        createGitIgnore(name)
      }
    })
  })
}

const createGitIgnore = (name) => {
  fs.createReadStream(`${filesFolder}${name}.gitignore`)
    .pipe(fs.createWriteStream('.gitignore'))
}

main()
