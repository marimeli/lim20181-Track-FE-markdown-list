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

  test('debería retornar un array de objetos con la propiedad href, text y path', () => {
    return mdLinks(process.cwd() + '//test//directory', options)
      .then(arrayLinks => {
        expect(arrayLinks).toEqual([{
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme.md'
        },
        {
          href: 'https://www.google.com.pe',
          text: 'Google',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md'
        },
        {
          href: 'http://algo.com/2/3/',
          text: 'Algo',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md'
        },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md'
        },
        {
          href: 'https://www.gle.com.pe',
          text: 'Google.caido',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md'
        }])
      })
  })

});








