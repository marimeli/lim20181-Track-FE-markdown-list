const validatePath = require('../cli'); 

describe('validatePath', () => {

  it('validatePath, debería ser una función', () => {
    expect(typeof(validatePath)).toBe('function');
  });

  it('Debería validar la url http://google.com y mostrar el siguiente texto: Es una url absoluta ', () => {
    expect(validatePath('http://google.com')).toBe('Es una ruta absoluta');
  });

  it('Debería validar la url /directorio/prueba.txt y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validatePath('C:\carpeta1\carpeta2\archivo1.doc')).toBe('Es una ruta relativa');
  }); 

  it('Debería validar la url C:\carpeta1 y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validatePath('C:\carpeta1')).toBe('Es una ruta relativa');
  }); 
 
});
 