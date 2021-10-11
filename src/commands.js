#! /usr/bin/env node
const yargs = require("yargs");
const gitnore = require("./gitnore");

const argv = yargs
  .help()
  .alias("help", "h")
  .epilog("For more information visit https://github.com/mathiasdonoso/gitnore")
  .showHelpOnFail(false, "whoops, something went wrong! run with --help").argv;

if (argv._[0]) {
  gitnore.createFileForParam();

  argv._.forEach((arg) => {
    gitnore.addToGitignore(arg.toLowerCase());
  });
}
