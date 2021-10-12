#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const filesFolder = path.join(__dirname, "../assets/gitignorefiles/");

const log = console.log;

const tempGitignoreFileName = `${new Date().getTime()}.gitignore`;

const addToGitignore = (filename) => {
  filename = filename.toLowerCase();

  try {
    const data = fs.readFileSync(`${filesFolder}${filename}.gitignore`);

    fs.appendFileSync(tempGitignoreFileName, `\n${data}`);
  } catch (error) {
    throw new Error(
      `There is no gitignore file available for "${filename}", checkout the available options at https://github.com/mathiasdonoso/gitnore#readme`
    );
  }
};

const createGitignoreFile = () => {
  fs.createWriteStream(tempGitignoreFileName);
};

const writeGitignoreFile = (args) => {
  args.forEach((file) => {
    addToGitignore(file);
  });
};

const replaceGitignoreTempFile = () => {
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
