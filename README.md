redundant / discontinued
========================

## prefer the script now provided by ElementaryJS

> elementaryJS now supports running and testing from the CLI

## instructions to use ElementaryJS CLI

**[adapted from @sp1tz's help](https://github.com/CosineP/eljs-cli/issues/1#issuecomment-586819704)**

1. `git clone https://github.com/plasma-umass/ElementaryJS`
2. install yarn (`yarnpkg` on debian) and run `yarn install && yarn build`
2. `cd eval` and run `./fetchLibs.sh`
3. Update all three libraries (`eval/libs/`) so that `module.exports` is set to the top-level function

    For example:
    ```js
    function lib220(config) {
      ...
    }
    ```
    now becomes:
    ```js
    module.exports = function lib220(config) {
      ...
    };
    ```

4.  "watch" [this repo](https://github.com/umass-compsci220/ocelot-settings)
to know if you have to refetch the libs
5. Run your script: `node <ejs path>/eval/eval.js <script path> [1]`

    the `1` indicates to run tests, leaving it out (*not* `0`) executes the
    script without tests

[history / more info](https://github.com/CosineP/eljs-cli/issues/1)

## convenience

i have the following in my bashrc for convenience:

    alias eljs='node ~/src/ElementaryJS/eval/eval.js'
    function teljs() {
        eljs "$@" 1
    }

which are used like `eljs hw3.js` (to run) and `teljs hw3.js` (to test)

## archived script usage

    npm install
    node index.js <testing | running> <file>

