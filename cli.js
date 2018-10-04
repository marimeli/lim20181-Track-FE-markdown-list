#!/usr/bin/env node

const mdLinks = require('./index');
const program = require('commander');

const options = {
    validate: false,
    stats: false
};

program
    .arguments('<path>')
    .option('-v, --validate')
    .option('-s, --stats')
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
                } else if (!options.validate && !options.stats) {
                    arrayLinks.forEach(link => {
                        console.log(`${link.href}\t ${link.text}\t ${link.file}\t`);
                    })
                } else {
                        console.log(arrayLinks);  
                }
            })
    })
    .parse(process.argv);