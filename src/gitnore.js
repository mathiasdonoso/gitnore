#! /usr/bin/env node

import { readFileSync, writeFile } from 'fs';
import { readdirSync } from 'node:fs';

const GITIGNORE_FILENAME = `.gitignore`;
const DOC_TEXT = 'Checkout the available options at https://github.com/mathiasdonoso/gitnore#readme';
const GITIGNORE_FOLDER_PATH = './vendor/gitignore/';

/**
  * @param {string[]} args
  */
async function init(args) {
  if (args.length === 0) {
    console.warn(`You need to specify which gitignore file want to be created. ${DOC_TEXT}`);
    return;
  }

  let content = '';
  for (let file of args) {
    let text = await getContentFor(file);

    if (text !== '') {
      content += `${text}\n`;
      console.info(`Obtained .gitignore info for ${file}.`);
    } else {
      console.warn(`Couldn't found .gitignore info for ${file}. The filename must match the one located in https://github.com/github/gitignore`);
    }
  }

  if (content === '') {
    console.warn(`Couldn't create an empty .gitignore file.`);
    return;
  }

  writeFile(GITIGNORE_FILENAME, content, err => {
    if (err) {
      console.error(err);
    } else {
      console.info(`Added .gitignore file.`);
    }
  });
}

/**
  * @param {string} filename
  * @returns {Promise<string>}
  */
async function getContentFor(filename) {
  try {
    /**
     * @type {string[]}
    */
    const files = readdirSync(GITIGNORE_FOLDER_PATH, { recursive: true }).filter(file => file.includes('.gitignore'));

    const file = files.find(f => {
      const lastSlash = f.lastIndexOf('/');
      let fileRenamed = f;
      if (lastSlash > -1) {
        fileRenamed = f.substring(lastSlash + 1, f.length);
      }

      return fileRenamed.toLowerCase() === `${filename.toLowerCase()}.gitignore`;
    });

    if (!file) return '';

    return readFileSync(`${GITIGNORE_FOLDER_PATH}/${file}`, 'utf8');
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  init,
};
