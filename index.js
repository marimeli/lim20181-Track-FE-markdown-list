const { resolve, extname } = require('path')
const { lstat, readFile, readFileSync, readdir } = require('fs-extra');
const fetch = require('node-fetch');
const marked = require('marked');
//const marked = require('marked-promise');

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

//Función que extrae los links de un archivo markdown. Debería retornar un array de links
const getLinksMd = (arrayFiles) => {
    return new Promise((resolve, reject) => {
    const links = [];
    arrayFiles.forEach(file => {
        const readMd = readFileSync('readme.md', 'utf8');
        const renderer = new marked.Renderer();
        renderer.link = (href, title, text) => {
            links.push({
                href: href,
                text: text,
                file: file
            });
        };
        resolve(marked(readMd, { renderer }))
    })
    return links;
    console.log( links);
})
};

getLinksMd(['readme.md']).then( o => console.log('ver link', o));

//Función que recibe array de links y sirve para validar status de un link: ok/fail
//Devuelve el status de cada link validado //Usando fetch para pedir archivo y consumir la respuesta(contenido)
const arrayLinks = [
    "https://google.com",
    "https://github.com"
]

const validateLink = (arrayLinks) => {
    return arrayLinks.map(link => {
        return fetch(link)
            .then(response => {
                return { status: response.status, text: "OK" }
                /*  const links = arrayLinks.map((objLink, statuslink) => {
                     objLink.status = response[statuslink].status;
                     objLink.statusText = response[statuslink].statusText;
                     return objLink;
                 }) */
            })
            .catch(e => {
                return { status: "404", text: "Fail" }
            })
    })
};

const validateStatusLink = () => {
    return new Promise((resolve, reject) => {
        Promise.all(validateLink(arrayLinks))
            .then(result => {
                resolve(result)
            })
            .catch(e => {
                reject(e)
            })
    })
};

validateStatusLink().then(res => {
    console.log(res)
})

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
        const arrFilesMd = getArrFiles(resolve(path)) //aqui resuelve las rutas que se ingresan como absolutas
        console.log(arrFilesMd)
        //.then(arrFiles => console.log('array de files', arrFiles)
        //.then(readMd)   
        if (arrFilesMd.length === 0) {
            resolve('Tu archivo o carpeta no tiene links');
        }
    })
};

module.exports = mdLinks;