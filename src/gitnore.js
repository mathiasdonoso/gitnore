#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const filesFolder = path.join(__dirname, "../assets/files/");

const log = console.log;

const createFileForParam = (filename) => {
  if (!filename) {
    createEmptyGitIgnoreFile();
  } else {
    readFile(filesFolder, filename)
      .then((file) => createGitIgnore(file))
      .catch((err) => console.error(chalk.red(err)));
  }
};

const createEmptyGitIgnoreFile = () => {
  fs.createWriteStream(".gitignore");
};

const createGitIgnore = (filename) => {
  fs.createReadStream(`${filesFolder}${filename}.gitignore`).pipe(
    fs.createWriteStream(".gitignore")
  );
};

const readFile = (folder, filename) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) {
        reject(err);
      }
      let fileFound = false;

      files.forEach((file) => {
        const name = file.split(".")[0].toLowerCase();
        if (name === filename) {
          fileFound = true;
          resolve(filename);
        }
      });

      if (!fileFound) {
        log(
          chalk.red(
            `There is no gitignore file available for "${filename}", checkout the available options at https://github.com/mathiasdonoso/gitnore#readme`
          )
        );
      }
    });
  });
};

const addToGitignore = (filename) => {
  readFile(filesFolder, filename)
    .then((file) => addFileContent(file))
    .catch((err) => console.error(chalk.red(err)));
};

const addFileContent = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${filesFolder}${filename}.gitignore`, async (err, data) => {
      if (err) {
        reject(err);
      }
      await resolve(fs.appendFileSync(".gitignore", `\n${data}`));
    });
  });
};

module.exports = {
  createFileForParam,
  addToGitignore,
};
