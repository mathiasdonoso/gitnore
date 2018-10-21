#! /usr/bin/env node
const fs = require('fs')
const filesFolder = `${__dirname}/../assets/files/`
const globalsFolder = `${__dirname}/../assets/globals/`

const createGitIgnore = (filename) => {
  fs.createReadStream(`${filesFolder}${filename}.gitignore`)
    .pipe(fs.createWriteStream('.gitignore'))
}

const createFile = (filename) => {
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

const addToGitignore = (filename) => {
  fs.readdir(globalsFolder, (err, files) => {
    if (err) console.error(err)
    files.forEach(file => {
      const name = file.split('.')[0].toLowerCase()

      if (name === filename) {
        addFileContent(name)
      }
    })
  })
}

const addFileContent = (filename) => {
  fs.readFile(`${globalsFolder}${filename}.gitignore`, (err, data) => {
    if (err) console.error(err)
    fs.appendFileSync('.gitignore', `\n${data}`)
  })
}

module.exports = {
  createFile,
  addToGitignore
}
