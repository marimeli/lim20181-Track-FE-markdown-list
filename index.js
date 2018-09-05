const path = require('path');
const fs = require('fs-extra');

//Funcion que valida si es archivo o directorio
/* const validateIsFileOrDirectory = (file) => {
    try {
        let stats = fs.statSync(file);
        if (stats.isFile()) return ('file');
        else if (stats.isDirectory()) return ('directory');
    } 
    return urlRelative;
};  */

const validateIsFile = (file) => {
    fs.lstat(file)
        .then(stat => {
            /* console.log(stat); */
            console.log(stat.isDirectory());
       /*      stat.isDirectory(); //=> true / false */
        })
        .catch(err => {
            console.log(err);
        });
};
validateIsFile('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');

const validateIsDirectory = (file) =>
    fs.lstat(file)
        .then(stat => {
          /*   console.log(stat); */
            console.log(stat.isFile());
          /*   stat.isFile(); //=> true / false */
        })
        .catch(err => {
            console.log(err);
        });
validateIsDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');


//Función que lee un archivo (falta filtrar que sea md)
const readContentFile = (path) => {
    fs.readFile(path, 'utf8')
        .then(content => {
            console.log(content);
        })
        .catch(err => {
            console.log(err);
        });
};
readContentFile('readme.md');

//Función que lee un directorio(falta recursividad)
const readDirectory = (path) => {
    fs.readdir(path)
        .then(files => {
            console.log(files);
        })
        .catch(err => {
            console.log(err);
        });
};
readDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');

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

module.exports = mdLinks; 
