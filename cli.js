#!/usr/bin/env node
/* const path = require('path');
const fs = require('fs'); */
const [, , ...args] = process.argv
/* console.log(`hello world ${args}`) */

const url = new RegExp('^(?:[a-z]+:)?//', 'i');
const urlAbsolute = 'Es una ruta absoluta';
const urlRelative = 'Es una ruta relativa';

const validatePath = (root) => {
    if (url.test(root) === true) {
        console.log(urlAbsolute);
        return urlAbsolute;
    }
    console.log(urlRelative);
    return urlRelative;
};
validatePath(args);
module.exports = validatePath;


const validateFile = () => {
};

const mdLinks = (path, options) => {
   /*  const pathFile = validatePath(path.resolve(root)); */
};
