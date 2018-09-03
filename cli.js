#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');

console.log(__dirname);
console.log('Executed before file reading');

const readme = 'C:/Users/Melissa Casas/Documents//markdown/lim20181-Track-FE-markdown-list/readme.md'
console.log(path.resolve(readme));
console.log(path.extname(readme));

/* //Funcion que valida que la ruta sea absoluta
const validatePath = (path) => {
    if (path.isAbsolute() === true) {
        console.log('Es una ruta absoluta');
    } else {
        console.log('Es una ruta relativa');
        console.log(path.resolve(path));
    }
 };  */


 //Funcion que valida si es archivo o directorio
/* const validateIsFileOrDirectory = (file) => {
    try {
        let stats = fs.statSync(file);
        if (stats.isFile()) return ('file');
        else if (stats.isDirectory()) return ('directory');
    } catch (err) {
        return ('No es un archivo ni directorio');
    }
    console.log(urlRelative);
    return urlRelative;
}; */

//Aquí lee un archivo md (el que especifico)
fs.readFile('./readme.md', 'utf8')
.then(content => {
    console.log(content);
})
.catch(err => {
    console.log(err);
});

//Aquí lee carpetas, devuelve un array de los archivos dentro del directorio
let directory = 'directory';
let dirFiles = Buffer.from(directory);

fs.readdir(dirFiles)
    .then(files => {
        console.log(files);
    })
    .catch(err => {
        console.log(err);
    });

    //Función que se exportará
/* const mdLinks = (path, options) => {
     return new Promise((resolve, reject) => {
         if (!path) reject('Ingrese un archivo o directorio');
         const pathAbs = path.resolve(path); //aqui resuelve las rutas que se ingresan como absolutas
         console.log(path.resolve(path));
         console.log(pathAbs);
          console.log('antes de resolve arr')
         setTimeout(() => {
             resolve([
                 {
                     href: 'href',
                     text: 'text',
                     file: 'file'
                 }
             ])
         }, 1000)
     })
 }; */

 /* module.exports = mdLinks; */
  /* mdLinks('C:\Users\Melissa Casas\Documents\markdown\lim20181-Track-FE-markdown-list\readme.md'); */