const { isAbsolute, resolve, join, extname, dirname, basename } = require('path')
const { lstat, readFile, readdir } = require('fs-extra');
const fetch = require('node-fetch');

//Función que resuelve una ruta como absoluta
const validatePath = (root) => {
    if (isAbsolute(root)) {
        return isAbsolute(root)
    } else {
        return resolve(root)
    }
};

//Función que valida si la ruta ingresada es un archivo o directorio
const validateIsFileOrDirectory = (root) => {
        lstat(root)
        .then(stat => {
            if (stat.isFile()) { //verifica si es archivo
                console.log(root);
                return [root]
            } else {
                readdir(root) //Sino es carpeta, entonces la lee
                    .then(files => {
                        for (const file in files) {
                            const element = files[file];
                        }
                        files.forEach(file => { //recorre cada carpeta para saber qué hay dentro
                             const archivo = resolve(root + '/' + file);
                             validateIsFileOrDirectory(archivo)
                        })
                    })
             }
        })
        .catch(err => {
            console.log(`El archivo o file no existe ${err.path}`);
        });
};

/* return new Promise((resolve, reject) => {

}); */

validateIsFileOrDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory');

/* validateIsFileOrDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory')
.then(result => {
    console.log(result)
}); */

