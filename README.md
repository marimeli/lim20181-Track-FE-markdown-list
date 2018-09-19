# Markdown Links 

Es una librería que verifica los links que se encuentran dentro de archivos en formato `Markdown` y reporta las estadísticas de los links totales, únicos y rotos que contiene la ruta ingresada.

#### Versión

1.0.0

## Instalación

```
npm i marimeli-md-links
```

## CLI (Línea de comando)

```
md-links <path> [options]
```
##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.

- `options`:
  - `--validate` o `-v`: Verifica si el link funciona o no. Como resultado se observará si el estado del link es "OK" o "FAIL".
  - `--stats` o `-s`: Muestra un texto con estadísticas básicas sobre los links, como la cantidad de links encontrados y cuántos son únicos.
  - También se puede combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.

##### Ejemplos de uso:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

```sh
$ md-links ./some/example.md -s -v
Total: 3
Unique: 3
Broken: 1
```
[Tablero Kanban usado para la planeación del proyecto](https://github.com/marimeli/lim20181-Track-FE-markdown-list/projects/2)