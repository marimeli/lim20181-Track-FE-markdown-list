#! / usr / bin / env node
const [, , ...args] = process.argv
console.log(`hello world ${args}`)

const r = new RegExp('^(?:[a-z]+:)?//', 'i');
const abs = 'Es una url absoluta';
const rel = 'Es una ruta relativa';
    
/* let options = {
    stats=true,
    validate=true
} */

const validatePath = (path) => {
    // validar si es relativo o absoluto
    // ver regex 
    // cuando sea relativo, => hacer que sea absoluto resolve()  o isabsolute()
    // retorna url absoluta
    if (r.test(path) === true) {
        console.log(abs);
        return abs;
    }
    console.log(rel);
    return rel;
};
module.exports = validatePath;


const validateFile = () => {
};

const mdLinks = (path, options) => {
};
