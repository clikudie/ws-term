#! /usr/bin/env node
const { program } = require('commander');
const { connect } = require('./commands/websocket');

program
    .command('connect <url>')
    .description('Connect to a websocket url')
    .action(connect);

program.parse();