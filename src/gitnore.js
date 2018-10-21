#! /usr/bin/env node
const fs = require('fs')
const filesFolder = `${__dirname}/../assets/files/`
const globalsFolder = `${__dirname}/../assets/globals/`

const createGitIgnore = (filename) => {
  fs.createReadStream(`${filesFolder}${filename}.gitignore`)
    .pipe(fs.createWriteStream('.gitignore'))
}

const readFile = (folder, filename) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) reject(err)
      files.forEach(file => {
        const name = file.split('.')[0].toLowerCase()

        if (name === filename) {
          resolve(filename)
        }
      })
    })
  })
}

const createFile = (filename) => {
  readFile(filesFolder, filename)
    .then(file => createGitIgnore(file))
    .catch(err => console.error(err))
}

const addToGitignore = (filename) => {
  readFile(globalsFolder, filename)
    .then(file => addFileContent(file))
    .catch(err => console.error(err))
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
