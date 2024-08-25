#! /usr/bin/env node

import { createWriteStream } from 'fs';

const GIT_IGNORE_FILE_NAME = `.gitignore`;
const DOC_TEXT = 'Checkout the available options at https://github.com/mathiasdonoso/gitnore#readme';

/**
  * @param {string[]} args
  */
async function init(args) {
  if (args.length === 0) {
    console.warn(`You need to specify which gitignore file want to be created. ${DOC_TEXT}`)
    return;
  }

  let content = '';
  for (let file of args) {
    let text = await getContentFor(file);

    if (text !== '') {
      console.info(`Obtained .gitignore info for ${file}.`)
    } else {
      console.warn(`Couldn't found .gitignore info for ${file} in https://github.com/github/gitignore`)
    }

    content += `${text}\n`;
  }

  const writeStream = createWriteStream(GIT_IGNORE_FILE_NAME, { encoding: 'utf8' });
  writeStream.write(`${content}`, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.info(`Added .gitignore file.`)
      writeStream.end();
    }
  });
}

const URLS = [
  'https://raw.githubusercontent.com/github/gitignore/main',
  'https://raw.githubusercontent.com/github/gitignore/main/Global',
  'https://raw.githubusercontent.com/github/gitignore/main/community',
  'https://raw.githubusercontent.com/github/gitignore/main/community/AWS',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Dotnet',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Elixir',
  'https://raw.githubusercontent.com/github/gitignore/main/community/GNOME',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Golang',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Java',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Javascript',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Linux',
  'https://raw.githubusercontent.com/github/gitignore/main/community/PHP',
  'https://raw.githubusercontent.com/github/gitignore/main/community/Python',
  'https://raw.githubusercontent.com/github/gitignore/main/community/embedded',
];

/**
  * @param {string} filename
  * @returns {Promise<string>}
  */
async function getContentFor(filename) {
  const modifiedFilename = filename.charAt(0).toUpperCase() + filename.slice(1);

  try {
    for (let baseUrl of URLS) {
      const endpoint = `${baseUrl}/${modifiedFilename}.gitignore`;
      const response = await fetch(endpoint);
      if (response.status !== 200) {
        continue;
      }

      const text = await response.text();
      return text;
    }

    return '';
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  init,
};
