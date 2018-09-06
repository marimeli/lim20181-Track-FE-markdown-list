const path = require('path');
const fs = require('fs-extra');
const fetch = require('node-fetch');

//Función que resuelve una ruta como absoluta
const validatePath = (root) => {
    if (path.isAbsolute(root)) {
        console.log('Es una ruta absoluta');
        console.log(path.isAbsolute());
    } else {
        console.log('Es una ruta relativa convertida a absoluta');
        console.log(path.resolve());
    }
};
validatePath('readme.md');

//Función que valida si es un archivo
const validateIsFile = (file) => {
    fs.lstat(file)
        .then(stat => {
            console.log('Archivo ' + stat.isFile());
            /*   stat.isFile(); //=> true / false */
        })
        .catch(err => {
            console.log(err);
        });
};
validateIsFile('readme.md');

//Función que valida si es un directorio
const validateIsDirectory = (directory) => {
    fs.lstat(directory)
        .then(stat => {
            console.log('Directorio ' + stat.isDirectory());
            /*      stat.isDirectory(); //=> true / false */
        })
        .catch(err => {
            console.log(err);
        });
};
validateIsDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');

//Función que lee un archivo 
const readFileContent = (path) => {
    fs.readFile(path, 'utf8')
        .then(content => {
            console.log('Contenido File: ' + content);
            /* console.log(path.extname('readme.md')); */
            /*  console.log(path.extname(path)); */
        })
        .catch(err => {
            console.log(err);
        });
};
readFileContent('readme.md');

//Función que verifica que sea un archivo markdown
const checkFileMd = (nameFile) => {
    const fileMd = /\.(md|mkdn|mdown|markdown?)$/i;
    /*    return fileMd.test(path.extname(nameFile)); */
    console.log(path.extname(nameFile));
};
checkFileMd('readme.md')

//Función que lee un directorio(falta recursividad)
const readDirectoryContent = (path) => {
    fs.readdir(path)
        .then(files => {
            console.log('Contenido Directory:');
            console.log(files);
        })
        .catch(err => {
            console.log(err);
        });
};
readDirectoryContent('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');

//Función que extrae los links de un archivo markdown
/* const getLinksMd = (file) => {
    let linksMd = [];
    const textLink = /\[(.*)\]/gi;
    const hrefLink = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/g;
    //Agregar los links al array de objetos
    linksMd.push({
        text: textLink,
        href: hrefLink,
        file: path
    });
    console.log(linksMd);
};
getLinksMd('readme.md'); */

//Ejemplito de Match
var cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var expresion = /[A-E]/gi;
var array_emparejamientos = cadena.match(expresion);
console.log(array_emparejamientos);

/* Usando fetch para pedir archivo y consumir la respuesta(contenido)
let promise = fetch('readme.md');
promise.then(res => {
    return res.json();
}).then(json => {
    console.log(json);
}); */

//Función para validar status de un link 
const validateStatusLink = (link) => {
    //ok
    //fail
};

//Función para validar el stats de los links
const validateStats = (path) => {
    //preguntar el estado!! usando node fetch para eso
    //total
    //unicos 
    //rotos
};


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!path) reject('Ingrese un archivo o directorio');
        const pathAbs = path.resolve(path); //aqui resuelve las rutas que se ingresan como absolutas
        /* console.log(path.resolve(path));
        console.log(pathAbs);
        console.log('antes de resolve arr') */
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
