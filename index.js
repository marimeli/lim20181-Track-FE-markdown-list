const { lstat, readdir, readFileSync } = require('fs-extra');
const { resolve, extname } = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

//Función que valida si la ruta ingresada es un archivo o directorio y retorna un array de archivos
const getArrFiles = (path) => {
    return lstat(path) // stat about a file
        .then(stat => {
            if (stat.isFile()) { //verifica si es archivo
                return [path];
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

//Función que verifica que sea un archivo markdown
const verifyIsMd = file => /\.(md|mkdn|mdown|markdown?)$/i.test(extname(file));

//Función lee y que extrae los links de un archivo markdown. Retorna un array de links
const getLinksMd = (arrayFiles) => {
    return new Promise((resolve, reject) => {
        const links = [];
        arrayFiles.forEach(file => {
            const fileMd = readFileSync(file, 'utf8');
            const renderer = new marked.Renderer();
            renderer.link = (href, title, text) => {
                links.push({
                    href: href,
                    text: text,
                    file: file
                });
            };
            marked(fileMd, { renderer })
        })
        resolve(links);
    })
};

//Función que recibe array de links y retorna un nuevo array con solo el contenido href 
//Usando fetch para pedir archivo y consumir la respuesta(contenido)
const validateLink = (arrayLinks) => {
  const arrLinks = arrayLinks.map(objLink => fetch(objLink.href))
  return Promise.all(arrLinks)
    .then(response => {
      const links = arrayLinks.map((objLinkContent, statsLink) => {
        objLinkContent.status = response[statsLink].status;
        objLinkContent.statusText = response[statsLink].statusText;
        return objLinkContent;
      });
      return links;
    })
 };

//Función para validar el stats de los links
const validateStats = (path) => {
    //preguntar el estado!! usando node fetch para eso
    //total
    //unicos
    //rotos
};

getArrFiles(process.cwd() + '/test/directory') // Me va a indicar donde se está ejecutando el archivo
    .then(arrFiles => arrFiles.filter(verifyIsMd))
    .then(getLinksMd)
    .then(validateLink)
    .then(console.log)


 /*    const mdLinks = (path, options) => {
      return new Promise((resolve, reject) => {
          if (!path) reject('Ingrese un archivo o directorio');
          const arrFilesMd = getArrFiles(resolve(path)) //aqui resuelve las rutas que se ingresan como absolutas
          if (arrFilesMd.length === 0) {
              resolve('Tu archivo o carpeta no tiene links');
          }
      })
  };
  
  module.exports = mdLinks;
   */
    
    