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
      return `El archivo o file no existe ${err.path}`;
    });
};

//Función que verifica que sea un archivo markdown y los filtra
const verifyIsMd = (arrFiles) => new Promise((resolve, reject) => {
  resolve(arrFiles.filter(file => /\.(md|mkdn|mdown|markdown?)$/i.test(extname(file))))
})

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
const validateLinks = (arrayLinks) => {
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
const mdLinks = (path, options) => {
  //console.log('path', path);
  //if (!path) reject('Ingrese un archivo o directorio');
  getArrFiles(resolve(path))// Me va a indicar donde se está ejecutando el archivo
    .then(verifyIsMd)
    .then(getLinksMd)
    .then(result => !options ? result : validateLinks(result))
    .then(o => {
      console.log('hola o', o);
    })
  /* return new Promise((resolve, reject) => {
  }) */
};

//mdLinks('readme.md')
mdLinks((process.cwd() + '//test//directory'), '')

module.exports = mdLinks;

