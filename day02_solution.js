/*
author: Jacob Egner
date:   2018-12-24
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  I felt a desire for python's Counter class, and maybe I should have used node's pycollections module;
  https://stackoverflow.com/questions/26320253/is-there-a-javascript-function-similar-to-the-python-counter-function

  Seems like String.prototype.slice is better than String.prototype.substring (and deprecated String.prototype.substr);
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  https://stackoverflow.com/questions/2243824/what-is-the-difference-between-string-slice-and-string-substring
*/

const common = require('./common.js');
const boxIds = common.readLines('day02_input.txt');

//------------------------------------------------------------------------------

const numBoxesWithCount2 = numBoxesWithExactCount(boxIds, 2);
const numBoxesWithCount3 = numBoxesWithExactCount(boxIds, 3);
const checksum = numBoxesWithCount2 * numBoxesWithCount3;

console.log("part1:", checksum, '(should be 7533)');

//------------------------------------------------------------------------------

console.log("part2:", getPartialMatch(boxIds), '(should be mphcuasvrnjzzkbgdtqeoylva)');
console.debug("end");

//------------------------------------------------------------------------------


function numBoxesWithExactCount(boxIds, desiredCount)
{
  return boxIds.reduce((accum, currVal) => accum + hasExactCount(currVal, desiredCount), 0);
}

function hasExactCount(text, desiredCount)
{
  let charCounter = {};
  for(let char of text)
  {
    charCounter[char] = (charCounter[char] || 0) + 1;
  }

  for(let char in charCounter)
  {
    if(charCounter[char] === desiredCount)
    {
      return true;
    }
  }

  return false;
}

function getPartialMatch(boxIds)
{
  // partialIdSets[i] will be a set of all box ids with the ith character removed
  let partialIdSets = [];

  for(let boxId of boxIds)
  {
    for(let charIdx = 0; charIdx < boxId.length; charIdx++)
    {
      if(charIdx >= partialIdSets.length)
      {
        partialIdSets.push(new Set());
      }

      let partialId = boxId.slice(0, charIdx) + boxId.slice(charIdx + 1);

      if(partialIdSets[charIdx].has(partialId))
      {
        return partialId;
      }

      partialIdSets[charIdx].add(partialId);
    }
  }

  return null;
}

