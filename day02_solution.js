/*
author: Jacob Egner
date:   2018-12-24
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  I was lured to use lodash module because of its countBy function:
  https://lodash.com/docs/4.17.11#countBy

  But originally, I felt a desire for python's Counter class, which is available from the pycollections module;
  https://stackoverflow.com/questions/26320253/is-there-a-javascript-function-similar-to-the-python-counter-function

  Seems like String.prototype.slice is better than String.prototype.substring (and deprecated String.prototype.substr);
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  https://stackoverflow.com/questions/2243824/what-is-the-difference-between-string-slice-and-string-substring
*/

const _ = require('lodash');
const common = require('./common.js');


(function main() {
  const boxIds = common.readLines('day02_input.txt');
  common.check(part1, boxIds, 7533);
  common.check(part2, boxIds, 'mphcuasvrnjzzkbgdtqeoylva');
  console.debug("end");
})();


function part1(boxIds)
{
  const numBoxesWithCount2 = numBoxesWithExactCount(boxIds, 2);
  const numBoxesWithCount3 = numBoxesWithExactCount(boxIds, 3);
  const checksum = numBoxesWithCount2 * numBoxesWithCount3;
  return checksum;
}

function part2(boxIds)
{
  return getPartialMatch(boxIds);
}

function numBoxesWithExactCount(boxIds, desiredCount)
{
  return boxIds.reduce((accum, currVal) => accum + hasExactCount(currVal, desiredCount), 0);
}

function hasExactCount(text, desiredCount)
{
  return _.values(_.countBy(text)).includes(desiredCount);
}

function getPartialMatch(boxIds)
{
  // partialIdSets[i] will be a set of all box ids with the ith character removed
  let partialIdSets = [];

  for(let boxId of boxIds)
  {
    // charIdx is which char to remove for partialId
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

