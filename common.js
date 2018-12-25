/*
author: Jacob Egner
date:   2018-12-24
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  using 'require' way instead of 'import' way because 'import' seems to still be experimental, see:
  https://stackoverflow.com/questions/53240278/using-node-js-require-vs-es6-import-export-2018

  node's fs module: https://nodejs.org/api/fs.html
  fs.readFileAsync: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
  Array iteration helpers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
*/

module.exports.check = check;
module.exports.readLines = readLines;
module.exports.readNums = readNums;
module.exports.readObjects = readObjects;

function readLines(inputPath)
{
  const fs = require('fs');
  const lines = fs.readFileSync(inputPath)
    .toString()
    .split('\n')
    .filter(line => line.length > 0);
  return lines;
}

function readNums(inputPath)
{
  return readLines(inputPath).map(parseFloat);
}

function readObjects(inputPath, ClassConstructor)
{
  return readLines(inputPath).map(line => new ClassConstructor(line));
}

function check(partFunction, input, answer)
{
  const calc = partFunction(input);
  console.log(partFunction.name + ":", calc);
  if(typeof(answer) !== typeof(undefined))
  {
    console.assert(calc === answer, "Calc=" + calc + ",  Answer=" + answer);
  }
}
