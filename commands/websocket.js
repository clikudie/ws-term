const chalk = require('chalk');
const WebSocket = require('ws');
const readline = require('readline');

const rLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('SIGINT', () => {
    process.exit();
});

function connect(url) {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        console.log(chalk.green.bold(`Connection to ${url} successful`));
    };

    ws.onmessage = (message) => {
        console.log(chalk.green.bold(`[RECEIVED] ${message.data}`));
    };

    ws.onerror = (err) => {
        console.log(chalk.red.bold(err.message));
        process.exit(1);
    };

    ws.onclose = () => {
        console.log(chalk.green.bold(`[INFO] Closing connection to ${url}`));
        process.exit(0);
    }

    rLine.on('line', (text) => {
        ws.send(text);
    })
}

module.exports = { connect };