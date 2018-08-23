const validatePath = require('../cli'); 

describe('validatePath', () => {

  it('validatePath, debería ser una función', () => {
    expect(typeof(validatePath)).toBe('function');
  });

  it('Debería validatePath la url http://google.com y mostrar el siguiente texto: Es una url absoluta ', () => {
    expect(validatePath('http://google.com')).toBe('Es una ruta absoluta');
  });

  it('Debería validatePath la url /directorio/prueba.txt y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validatePath('/directorio/prueba.txt')).toBe('Es una ruta relativa');
  }); 

  it('Debería validar la url  D:\Data\Shapefiles\Soils y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validatePath(' D:\Data\Shapefiles\Soils')).toBe('Es una ruta relativa');
  }); 
 
});
