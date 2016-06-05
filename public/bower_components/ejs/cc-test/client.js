var ejs = require('../index.js');
var read = require('fs').readFileSync;
var str = read('./src/include.ejs', 'utf8');
var out = ejs.compile(str, {
  open: '{{',
  close: '}}',
  filename: './src/include.ejs',
  client: true
});

console.log(out.toString());
console.log('========');
console.log(out());
