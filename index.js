const { resolve, extname } = require('path')
const { lstat, readFile, readdir } = require('fs-extra');
const fetch = require('node-fetch');

//Función que verifica que sea un archivo markdown
const verifyIsMd = file => /\.(md|mkdn|mdown|markdown?)$/i.test(extname(file));

//Función que valida si la ruta ingresada es un archivo o directorio y retorna un array de archivos
const getArrFiles = (path) => {
    return lstat(path) // stat about a file
        .then(stat => {
            if (stat.isFile()) { //verifica si es archivo
                const fileMd = verifyIsMd(path);//llama a la función que verifica si la ruta es .md
                if (fileMd) {
                    return [path];
                } else {
                    return `El archivo no es markdown ${path}`
                  }              
            } else {
                return readdir(path) //Sino es archivo es carpeta, entonces la lee
                    .then(files => {
                        return files.map(file => {
                            return getArrFiles(resolve(path, file));
                        })
                    })
                    .then(arrayOfPromises => {
                        return Promise.all(arrayOfPromises);
                    })
                    .then(files => {
                        let arrayPath = [];
                        files.forEach(file => {
                            arrayPath = arrayPath.concat(file);
                        })
                        return arrayPath;
                    })
            }
        })
        .catch(err => {
            console.log(`El archivo o file no existe ${err.path}`);
            return err;
        });
};


getArrFiles(process.cwd() + '/test/directory')
    .then(arrFiles => console.log('array de files', arrFiles))

//Función que lee un archivo markdown y extrae los links. 
//Debería retornar un array de links
const readFileContent = (arrMd) => {
    readFile(arrMd, 'utf8')
        .then(content => {
            console.log('Contenido File: ' + content);
        })
        .catch(err => {
            console.log(err);
        });
 };
 readFileContent('readme.md');

//Función que recibe array de links y sireve para validar status de un link
//Devuelve el status de cada link
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

 //Ejercicio de status de links con promesas
const arrayLinks = [
    "https://google.com",
    "https://github.com"
]

const validateLink = (arrayLinks) => {
    return arrayLinks.map(link => {
        return fetch(link)
        .then(res => {
            return { status: res.status, text: "OK" }
        })
        .catch(e => {
            return { status: "404", text: "Fail"}
        })
    })
};

const Hola = () => {
    return new Promise((resolve, reject) => {
        Promise.all(validateLink(arrayLinks))
        .then(result => {
            resolve(result)
        })
        .catch(e => {
            reject(e)
        })
    })
}

Hola().then(res => {
    console.log(res)
})