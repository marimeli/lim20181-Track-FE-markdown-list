#!/usr/bin/env node

const [,, ...argvs] = process.argv;
const totalArgvs = argvs.length;
const path = argvs[0];
const mdLinks = require('./index');

