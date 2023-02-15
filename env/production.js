const fs = require('fs')
const getParams = require('./util')
const file = fs.readFileSync('./.env.production', 'utf-8')
fs.writeFileSync('./src/config/api.ts', getParams(file))