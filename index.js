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

// returns whitelistCode
async function loadLibraries() {

    const DAYS_TO_FETCH = 30;
    const WRITE_TO = __dirname + '/.eljs-libraries.json';
    let cache = undefined;
    try {
        const cacheFile = fs.readFileSync(WRITE_TO, 'utf8');
        cache = JSON.parse(cacheFile);
    // silently fail otherwise
    } catch (e) {}
    if (!cache || cache.date + new Date(0, 0, DAYS_TO_FETCH) < Date.now()) {

        console.log("Refetching libraries....");

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

        const toFile = {date: Date.now(), libraries: wl};

        fs.writeFileSync(WRITE_TO, JSON.stringify(toFile));

        return wl;

    } else {

        return cache.libraries;

    }
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
loadLibraries().then((whitelistCode) => {
    const runner = elementaryJS.compile(p, {
        consoleLog: console.log,
        version,
        whitelistCode,
    });
    if (runner.kind === 'error') {
        for (const err of runner.errors) {
            console.error(`Line ${err.line}: ${err.message}`);
        }
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
