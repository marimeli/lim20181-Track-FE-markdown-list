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
    return expect(mdLinks('test/directory', options)).toBeInstanceOf(Promise);
  });
  
  test('debería retornar un array de objetos con la propiedad href, text, file', () => {
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
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme.md'
        },
        {
          href: 'https://www.google.com.pe',
          text: 'Google2',
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
  });

  test('debería retornar un array de objetos con la propiedad href, text, file, status, statusText', () => {
    options.validate = true
    return mdLinks(process.cwd() + '//test//directory', options)
      .then(arraylinks => {
        expect(arraylinks).toEqual([{
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://www.google.com.pe',
          text: 'Google',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://www.google.com.pe',
          text: 'Google2',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://www.google.com.pe',
          text: 'Google',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'http://algo.com/2/3/',
          text: 'Algo',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md',
          status: 404,
          statusText: 'Not Found'
        },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://www.gle.com.pe',
          text: 'Google.caido',
          file: 'C:\\Users\\Melissa Casas\\Documents\\markdown\\lim20181-Track-FE-markdown-list\\test\\directory\\dir1\\readme2.md',
          status: 404,
          statusText: 'Fail'
        }])
      })
  
  });
  
  test('debería retornar un array con un objeto con la propiedad total, únique', () => {
    options.stats = true,
    options.validate = false
    return mdLinks('test/directory', options)
      .then(arrLinks => {
        expect(arrLinks).toEqual(
          [{ total: 7, unique: 5 }]
        )
      })
  });

  test('debería retornar un array con un objeto con la propiedad total, únique, broken', () => {
    options.stats = true,
    options.validate = true
    return mdLinks('test/directory', options)
      .then(arrLinks => {
        expect(arrLinks).toEqual(
          [{ total: 7, unique: 5, broken: 0 }]
        )
      })
  });

/*   test('si la ruta pasada no existe debería rechazar la promesa', () => {
    expect.assertions(1);
    return expect(mdLinks('test/test', options)).rejects.toMatch('El archivo o file no existe');
  });
  */
});






