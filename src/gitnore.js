#! /usr/bin/env node
const fs = require('fs')
const filesFolder = `${__dirname}/../assets/files/`

const createFile = (filename) => {
  readFile(filesFolder, filename)
    .then(file => createGitIgnore(file))
    .catch(err => console.error(err))
}

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

const addToGitignore = (filename) => {
  readFile(filesFolder, filename)
    .then(file => addFileContent(file))
    .catch(err => console.error(err))
}

const addFileContent = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${filesFolder}${filename}.gitignore`, (err, data) => {
      if (err) reject(err)
      resolve(fs.appendFileSync('.gitignore', `\n${data}`))
    })
  })
}

module.exports = {
  createFile,
  addToGitignore
}
