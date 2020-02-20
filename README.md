eljs: CLI for elementaryJS (Ocelot)
===================================

> test and run elementaryJS from the comfort of ur CLI instead of the Ocelot Web IDE

## installation

first make sure you have node installed, try [nvm](https://github.com/nvm-sh/nvm)

    npm isntall

## running

    node index.js <testing | running> <file>

## alternatives

there is a
[script provided by ElementaryJS](https://github.com/plasma-umass/ElementaryJS/blob/master/eval/compileAndRun.js)
which can run programs, but does not currently support running tests. in
the issues you can find a
**[usage guide](https://github.com/CosineP/eljs-cli/issues/1#issuecomment-586819704)**
(and the attached thread explains more about the two options).

## future

- im aware that the interface sucks. for now i have some aliases like:


        alias eljs='node ~/src/eljs/index.js running "$@"'
        alias teljs='node ~/src/eljs/index.js testing "$@"'

- images!! we've been using images a lot but im not sure how i want to include
them in a CLI like maybe opening them in ImageMagick or something. it'll
probly require modifying lib220 which is no big deal cause it's like 20
lines of code and i know where it is

if you want to help feel free to submit a PR, we're all casual here. you can
also message me any way you know how / open an issue if you have questions /
want to talk about it

## pitch

*[greyscale TV commercial]*  
tired of using boring old arrow keys?  
tired of installing google chrome when you already use firefox?  
tired of the ol' Ocelot point and click adventure?  
tired of chrome eating up all your RAM?  
*[commercial turns to color]*  
well boy have i got news for you!  
introducing eljs!  
a command line interface for the compiler that Ocelot uses

bonus points!! if you don't have access to the damn signup thing, you can use your filesystem to save your files. so go ahead and download today!  
eljs!  
tell your friends!  

