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

(function main() {
  const inNums = common.readNums('day01_input.txt');
  common.check(part1, inNums, 569);
  common.check(part2, inNums, 77666);
  console.debug("end");
})();

//------------------------------------------------------------------------------

function part1(inNums)
{
  const sum = inNums.reduce((a, b) => a + b, 0);
  return sum;
}

function part2(inNums)
{
  let partialSums = new Set();
  let accum = 0;

  for(let inNumIdx = 0; !partialSums.has(accum); inNumIdx = (inNumIdx + 1) % inNums.length)
  {
    partialSums.add(accum);
    accum += inNums[inNumIdx];
  }

  return accum;
}
