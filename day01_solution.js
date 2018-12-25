/*
author: Jacob Egner
date:   2018-12-24
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  node's fs module: https://nodejs.org/api/fs.html
  fs.readFileAsync: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
  Array iteration helpers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
*/

const common = require('./common.js');
const inNums = common.readNums('day01_input.txt');

//------------------------------------------------------------------------------

const sum = inNums.reduce((a, b) => a + b, 0);
console.log('part1:', sum, '(should be 569)');

//------------------------------------------------------------------------------

let partialSums = new Set();
let accum = 0;

for(let inNumIdx = 0; !partialSums.has(accum); inNumIdx = (inNumIdx + 1) % inNums.length)
{
  partialSums.add(accum);
  accum += inNums[inNumIdx];
}

console.log('part2:', accum, '(should be 77666)');
console.debug("end");
