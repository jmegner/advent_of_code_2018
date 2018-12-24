/*
author: Jacob Egner
date:   2018-12-24
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  using 'require' way instead of 'import' way because 'import' seems to still be experimental, see:
  https://stackoverflow.com/questions/53240278/using-node-js-require-vs-es6-import-export-2018
*/

module.exports.readNums = function(inputPath)
{
  const fs = require('fs');
  const nums = fs.readFileSync(inputPath)
    .toString()
    .split('\n')
    .filter(line => line.length > 0)
    .map(parseFloat);
  return nums;
}
