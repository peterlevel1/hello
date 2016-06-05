var ejs = require('ejs');
var read = require('fs').readFileSync;
var str = read('./src/include.ejs', 'utf8');
var out = ejs.render(str, {
  filename: './src/include.ejs'
});

console.log(out);
