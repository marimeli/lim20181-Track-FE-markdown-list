#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');

console.log('Executed before file reading');

/* Ejercicios de ejemplos
console.log(__dirname);

const readme = 'C:/Users/Melissa Casas/Documents//markdown/lim20181-Track-FE-markdown-list/readme.md'
console.log(path.resolve(readme));
console.log(path.extname(readme)); */


//Aquí lee un archivo md (el que especifico)
let content = fs.readFile('./readme.md', 'utf8')
    .then(content => {
        console.log(content);
    })
    .catch(err => {
        console.log(err);
    });

console.log('Executed after file reading');

//Aquí lee carpetas, devuelve un array de los archivos dentro del directorio
let directory = 'directory';
let dirFiles = Buffer.from(directory);

fs.readdir(dirFiles)
    .then(files => {
        files.forEach(file => {
            console.log(file);
        })
    })
    .catch(err => {
        console.log(err);
    });