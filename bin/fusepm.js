#!/usr/bin/env node

process.title = 'fusepm'
var program = require('commander');
var install = require('../lib/install');
var list = require('../lib/list');
var bump = require('../lib/bump');
var fixunoproj = require('../lib/fixunoproj');
var fusepm = require('../lib/fusepm');
var fpm_npm = require('../lib/npm');

program
  .version(require('../package.json').version)
  .option('-p, --unoproj [filename]', 'Specify .unoproj file')

program
  .command('install [module...]')
  .description('install fuse module')
  .action(install);

program
  .command('list')
  .description('list registered fuse modules')
  .action(list);

program
  .command('bump <release> [version]')
  .description('bump version')
  .action(bump);

program
  .command('version <release> [version]', null, { noHelp: true })
  .description('bump version')
  .action(bump);

program
  .command('fixunoproj')
  .description('fix the unoproj')
  .action(fixunoproj);

program
  .command('npm <module...>')
  .description('make npm module(s) ready for fuse (experimental)')
  .option('--ignore-missing', 'ignore missing depdencies for require')
  .action(fpm_npm);

program
  .command('*', null, { noHelp: 1 })
  .action(function () { program.help() })

fusepm.set_commander(program);
program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}

