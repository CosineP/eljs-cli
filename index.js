// mostly copied from Ocelot, specifically this file:
// https://github.com/umass-compsci220/Ocelot/blob/master/frontend/src/sandbox.ts

const elementaryJS = require('@stopify/elementary-js');
const elementaryRTS = require('@stopify/elementary-js/dist/runtime');
const EJSVERSION = require('@stopify/elementary-js/dist/version');
const https = require('https');
const fs = require('fs');

function version() {
    return {
        elementaryJS: EJSVERSION,
        ocelot: OCELOTVERSION
    };
}

let whitelistCode = {};
async function loadLibraries() {

	// This was a fetch but uhhh no
    // https://github.com/umass-compsci220/Ocelot/blob/0ec94a3280d657e985961203c81fffcf13777624/frontend/src/secrets.ts
    const wl = {
        "lib220": "https://raw.githubusercontent.com/umass-compsci220/ocelot-settings/master/dist/lib220.js",
        "oracle": "https://raw.githubusercontent.com/umass-compsci220/ocelot-settings/master/dist/oracle.js",
        "rrt": "https://raw.githubusercontent.com/umass-compsci220/ocelot-settings/master/dist/rrt.js"
    };

    for (const module in wl) {
        let prom = new Promise((resolve, reject) => {
            https.get(wl[module], res => {
                let val = '';
                res.on('data', data => {
                    val += data;
                });
                res.on('end', () => {
                    resolve(val);
                });
            }).on('error', err => {
                reject(err);
            });
        });
        wl[module] = await prom;
    }

    whitelistCode = wl;
}

function opts() {
    return {
        consoleLog: console.log,
        version, whitelistCode
    };
}

// do better
const currentMode = process.argv[2];
const path = process.argv[3];
const p = fs.readFileSync(path, 'utf8');


console.log('Compiling...');
loadLibraries().then(() => {
    const runner = elementaryJS.compile(p, opts());
    if (runner.kind === 'error') {
        console.error("whoops error TODO");
        return;
    }
    console.log('Compilation succesful.');
    if (currentMode === 'running') {
        console.log('Starting program...');
    } else if (currentMode === 'testing') {
        console.log('Running tests...');
    }
    elementaryRTS.enableTests(currentMode === 'testing');
    runner.run(result => {
        if (currentMode === 'testing' && result.type !== 'exception') {
          // false means CLI, not web format
          const summary = elementaryRTS.summary(false);
          console.log(summary.output, ...summary.style);
        }
        if (currentMode !== 'testing' && result.type === 'normal') {
          console.log('Program terminated normally.');
        }
    });
})
