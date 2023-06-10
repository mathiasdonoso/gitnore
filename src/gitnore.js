#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const filesFolder = path.join(__dirname, '../assets/gitignorefiles/');

const log = console.log;

const gitignoreFileName = `.gitignore`;

const init = (args) => {
  if (args.length > 0) {
    const writeStream = fs.createWriteStream(gitignoreFileName);

    try {
      args.forEach((file) => {
        writeStream.write(`\n${getContentFrom(file)}`);
      });

      log(chalk.green('.gitignore file created successfully'));
    } catch (error) {
      clear();
      log(chalk.red(error));
    } finally {
      writeStream.end();
    }
  } else {
    log(
      chalk.yellow(
        'You need to specify which gitignore file want to be created. checkout the available options at https://github.com/mathiasdonoso/gitnore#readme'
      )
    );
  }
};

const getContentFrom = (filename) => {
  filename = filename.toLowerCase();

  try {
    const data = fs.readFileSync(`${filesFolder}${filename}.gitignore`);

    return data;
  } catch (error) {
    throw new Error(
      `There is no gitignore file available for "${filename}", checkout the available options at https://github.com/mathiasdonoso/gitnore#readme`
    );
  }
};

const clear = () => {
  fs.unlinkSync(gitignoreFileName);
};

module.exports = {
  init,
};
