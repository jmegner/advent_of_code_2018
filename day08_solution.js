/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const _ = require('lodash');
const common = require('./common.js');


(function main() {
  var treeVals = common.readLines('day08_input.txt')[0].split(' ').map(Number);

  common.check(part1, treeVals, 35911);
  common.check(part2, treeVals, 17206);
  //common.check(part2, '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(Number), 66);
  console.debug('end');
})();


function part1(treeVals)
{
  return getTreeQualityAndEndIdx(treeVals, 0, true)[0];
}

function part2(treeVals)
{
  return getTreeQualityAndEndIdx(treeVals, 0, false)[0];

}

function getTreeQualityAndEndIdx(treeVals, startIdx, qualityIsMetadataSum)
{
  let treeQuality = 0;
  let currIdx = startIdx;
  let numChildNodes = treeVals[currIdx++];
  let numMetadataEntries = treeVals[currIdx++];
  let childQualities = new Array(numChildNodes).fill(0);

  for(let childIdx = 0; childIdx < numChildNodes; childIdx++)
  {
    [childQualities[childIdx], currIdx] = getTreeQualityAndEndIdx(treeVals, currIdx, qualityIsMetadataSum);

    if(qualityIsMetadataSum)
    {
      treeQuality += childQualities[childIdx];
    }
  }

  for(let metadataIdx = 0; metadataIdx < numMetadataEntries; metadataIdx++)
  {
    let metadataEntry = treeVals[currIdx++];

    if(qualityIsMetadataSum || numChildNodes == 0)
    {
      treeQuality += metadataEntry;
    }
    else if(metadataEntry >= 1 && metadataEntry <= numChildNodes)
    {
      treeQuality += childQualities[metadataEntry - 1]
    }
  }

  return [treeQuality, currIdx];
}
