const mdLinks = require('../index');

const options = {
  validate: false,
  stats: false
};

describe('mdLinks', () => {

  it('debería ser una función', () => {
    expect(typeof (mdLinks)).toBe('function');
  });

  test('debería retornar una promesa que se resuelve con un array de objetos ', () => {
    return expect(mdLinks(process.cwd() + '//test//directory', options)).toBeInstanceOf(Promise);
  });


});








