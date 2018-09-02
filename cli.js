#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

//Funcion que valida que la ruta sea absoluta
const validatePath = (root) => {
    if (path.isAbsolute() === true) {
        console.log('Es una ruta absoluta');
    } else {
        console.log('Es una ruta relativa');
        console.log(path.resolve(root));
    }
 }; 

//Funcion que valida si es archivo o directorio
const validateIsFileOrDirectory = (file) => {
    try {
        let stats = fs.statSync(file);
        if (stats.isFile()) return ('file');
        else if (stats.isDirectory()) return ('directory');
    } catch (err) {
        return ('No es un archivo ni directorio');
    }
};

//Aquí lee un archivo (el que especifico)
fs.readFile('./readme.md', 'utf8', (err, content) => {
    if (err) {
        console.log(err);
    }
    console.log(content);
});

/* console.log('Executed after file reading'); */

//Aquí lee una carpeta, devuelve un array de los archivos dentro del directorio
let directory = 'directory';
let dirFiles = Buffer.from(directory);

fs.readdir(dirFiles, (err, files) => {
    if (err) {
        console.log(err);
    }
    console.log(files);
});

//Función que se exportará
const mdLinks = (path, options) => {
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
};

/* mdLinks('C:\Users\Melissa Casas\Documents\markdown\lim20181-Track-FE-markdown-list\readme.md'); */
module.exports = mdLinks;

