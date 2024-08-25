#! /usr/bin/env node

import gitnore from './src/gitnore.js';

const values = process.argv.slice(2);
gitnore.init(values);

