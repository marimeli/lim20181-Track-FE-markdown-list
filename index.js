const { isAbsolute, resolve, join, extname, dirname, basename } = require('path')
const { lstat, readFile, readdir } = require('fs-extra');
const fetch = require('node-fetch');


//Función que valida si la ruta ingresada es un archivo o directorio. Debería retornar un array de archivos
const getFiles = (path) => {
    return lstat(path) // stat about a file
        .then(stat => {
            let arrayLinks3 = []
            if (stat.isFile()) { //verifica si es archivo
                return [path]
            } else {
                return readdir(path) //Sino es carpeta, entonces la lee
                    .then(files => {
                        const arrayOfPromises = files.map(file => {
                            return getFiles(resolve(path, file))
                        })
                        Promise.all(arrayOfPromises)
                            .then(respuestas => {
                                respuestas.forEach(res => {
                                    arrayLinks3 = arrayLinks3.concat(res)
                                    console.log('concatenar', arrayLinks3)
                                })
                                /* console.log('f', arrayLinks3);
                                return arrayLinks3; */
                            })
                    })
            }
        })
        .catch(err => {
            console.log(`El archivo o file no existe ${err.path}`);
            return err;
        });
};

getFiles(process.cwd() + '/test/directory')
    .then(a => console.log('j', a))