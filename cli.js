#!/usr/bin/env node

/* const [,, ...argvs] = process.argv;
const totalArgvs = argvs.length;
const path = argvs[0];
console.log( argvs);
console.log(path); */

const mdLinks = require('./index');
const program = require('commander');

const options = {
    validate: false,
    stats: false
};

program
    .arguments('<path>')
    .option('-v, --validate', 'Validar links si están rotos o no')
    .option('-s, --stats', 'Mostrar stats de los links')
    .action(path => {
        options.validate = program.validate;
        options.stats = program.stats;
        mdLinks(path, options)
            .then(arrayLinks => {
                if (options.validate && !options.stats) {
                    arrayLinks.forEach(link => {
                        console.log(`${link.file}\t ${link.href}\t ${link.status}\t${link.statusText}`);
                    })
                } else if (!options.validate && options.stats) {
                    arrayLinks.forEach(link => {
                        console.log(`total:${link.total}\nunique:${link.unique}`);
                    })
                } else if (options.validate && options.stats) {
                    arrayLinks.forEach(link => {
                        console.log(`total:${link.total}\nunique:${link.unique}\nbroken:${link.broken}`)
                    })
                } else {
                    arrayLinks.forEach(link => {
                        console.log(`${link.file}\t ${link.href}\t ${link.text}`); 
                    })
                }
            })
    })
    .parse(process.argv);


    /* C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory */
    //mdLinks('readme.md')
    /* console.log('resultado final', arrayLinks); */

    /* mdLinks(('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory'), { stats: false, validate: false }).then(o => {
    console.log('resultado final', o);   
  }) */
