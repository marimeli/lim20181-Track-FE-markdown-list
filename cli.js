#!/usr/bin/env node

const [,, ...argvs] = process.argv;
const totalArgvs = argvs.length;
const path = argvs[0];
console.log( argvs);
console.log(path);

const mdLinks = require('./index');

