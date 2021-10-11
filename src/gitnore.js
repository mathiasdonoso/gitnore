#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const filesFolder = path.join(__dirname, "../assets/files/");

const log = console.log;

const tempGitignoreFileName = `${new Date().getTime()}.gitignore`;

const readFile = (folder, filename) => {
  const files = fs.readdirSync(folder);

  let fileFound = false;

  files.forEach((file) => {
    const name = file.split(".")[0].toLowerCase();
    if (name === filename) {
      fileFound = true;
    }
  });

  if (!fileFound) {
    throw new Error(
      `There is no gitignore file available for "${filename}", checkout the available options at https://github.com/mathiasdonoso/gitnore#readme`
    );
  } else {
    return filename;
  }
};

const addToGitignore = (filename) => {
  filename = filename.toLowerCase();

  const file = readFile(filesFolder, filename);

  if (file) {
    addFileContent(file);
  }
};

const addFileContent = (filename) => {
  const data = fs.readFileSync(`${filesFolder}${filename}.gitignore`);

  fs.appendFileSync(tempGitignoreFileName, `\n${data}`);
};

const createGitignoreFile = () => {
  fs.createWriteStream(tempGitignoreFileName);
};

const writeGitignoreFile = (args) => {
  args.forEach((file) => {
    addToGitignore(file);
  });
};

replaceGitignoreTempFile = () => {
  fs.renameSync(tempGitignoreFileName, ".gitignore");
};

const clear = () => {
  fs.unlinkSync(tempGitignoreFileName);
};

const init = (args) => {
  if (args.length > 0) {
    try {
      createGitignoreFile();

      writeGitignoreFile(args);

      replaceGitignoreTempFile();

      log(chalk.green(".gitignore file created successfully"));
    } catch (error) {
      clear();
      log(chalk.red(error));
    }
  } else {
    log(
      chalk.yellow(
        "You need to specify which gitignore file want to be created. checkout the available options at https://github.com/mathiasdonoso/gitnore#readme"
      )
    );
  }
};

module.exports = {
  init,
};
