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

//Función lee y que extrae el texto de los links de un archivo markdown. Retorna un array de links
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

//Función que recibe un objeto que representa el link y retorna el mismo objeto con dos nuevas propiedades(ok/fail: status del link)
//Usando fetch para pedir archivo y consumir la respuesta(contenido)
const validateEachLink = ({ text, href, file }) => {
  return fetch(href)
    .catch(() => {
      return ({
        status: 404,
        statusText: 'Fail'
      });
    })
    .then(response => {
      return ({
        href, text, file,
        status: response.status,
        statusText: response.statusText
      })
    })
};


const validateLinks = (arrLinks) => {
  return Promise.all(arrLinks.map(objLink => validateEachLink(objLink)))
};

//Función para validar el stats de los links. (Pregunta el estado: links total y únicos)
const validateStats = (arrLinks) => ([{
  total: arrLinks.length,
  unique: new Set(arrLinks.map(link => link.href)).size
}]);

//Función para validar los links rotos 
const validateLinksBroken = (arrLinks) => arrLinks.filter(link => link.status === '404').length;

//Función para ver stats y validar los links. 
const validateBothOptions = (links) => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        total: validateStats(links)[0].total,
        unique: validateStats(links)[0].unique,
        broken: validateLinksBroken(links)
      }])
  })
};

//Función principal que se exporta
const mdLinks = (path, options) => {
  return getArrFiles(resolve(path))
    .then(verifyIsMd)
    .then(getLinksMd)
    .then(links => {
      if (options.validate && options.stats) {
        return validateBothOptions(links);
      } else if (options.validate && !options.stats) {
        return validateLinks(links)
      } else if (!options.validate && options.stats) {
        return validateStats(links)
      }
      return links;
    })
};

module.exports = mdLinks;