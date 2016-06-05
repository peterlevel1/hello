var ejs = require('../index.js');
var read = require('fs').readFileSync;
var str = read('./src/include.ejs', 'utf8');
var out = ejs.render(str, {
  open: '{{',
  close: '}}',
  filename: './src/include.ejs'
});

console.log(out);
