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

//Función que valida si la ruta ingresada es un archivo o directorio. Debería retornar un array de archivos
const validateIsFileOrDirectory = (path) => {
    return lstat(path) // stat about a file
        .then(stat => {
            let arrayLinks3 = []            
            if (stat.isFile()) { //verifica si es archivo
                return [path]
            } else {
                return readdir(path) //Sino es carpeta, entonces la lee
                    .then(files => {
                        for (const file in files) {
                            const element = files[file];
                        }
                        const arrayOfPromises = files.map(file => { //recorre cada carpeta para saber qué hay dentro
                            const archivo = resolve(path,file);
                            return validateIsFileOrDirectory(archivo)  
                        })
                        Promise.all(arrayOfPromises)
                            .then(respuestas => {
                                respuestas.forEach(res => {
                                    arrayLinks3 = arrayLinks3.concat(res)
                                    console.log('concate', arrayLinks3)
                                })
                                // console.log('f', arrayLinks3);
                                // return arrayLinks3;
                            })
                    })
            }
        })
        // .catch(err => {
        //     console.log(`El archivo o file no existe ${err.path}`);
        //     return err;
        // });
};

validateIsFileOrDirectory(process.cwd() + '/test/directory')
    .then(a => console.log('j',a))


/* validateIsFileOrDirectory('C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory')
.then(result => {
    console.log(result)
});  */