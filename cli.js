#!/usr/bin/env node

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
                        console.log(`${link.href}\t ${link.text}\t ${link.file}\t ${link.status}\t${link.statusText}`);
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
                        console.log(arrayLinks);  
                }
            })
    })
    .parse(process.argv);