const fs = require('fs')
const filesFolder = './assets/files/'

const createGitIgnore = (name) => {
  fs.createReadStream(`${filesFolder}${name}.gitignore`)
    .pipe(fs.createWriteStream('.gitignore'))
}

module.exports = (filename) => {
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
