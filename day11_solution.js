/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const _ = require('lodash');
const common = require('./common.js');


(function main() {
  //common.check(part1, 18, '33,45');
  //common.check(part1, 42, '21,61');
  common.check(part1, 7400, '34,72');
  common.check(part2, 7400, '233,187,13');
  console.debug('end');
})();


function part1(gridSerialNum)
{
  return findBestCluster(gridSerialNum, 3);
}

function part2(gridSerialNum)
{
  return findBestCluster(gridSerialNum);
}


function findBestCluster(gridSerialNum, requiredClusterSideLen)
{
  const gridSideLen = 300;
  let powers = [];

  for(let x = 1; x <= gridSideLen; x++)
  {
    powers.push([]);
    for(let y = 1; y <= gridSideLen; y++)
    {
      powers[powers.length - 1].push(calcPower(x, y, gridSerialNum));
    }
  }

  const clusterSideLenMin = requiredClusterSideLen ? requiredClusterSideLen : 1;
  const clusterSideLenMax = requiredClusterSideLen ? requiredClusterSideLen : gridSideLen;
  let bestClusterPower = -9e9;
  let bestClusterPos = '';

  for(let clusterSideLen = clusterSideLenMin; clusterSideLen <= clusterSideLenMax; clusterSideLen++)
  {
    for(let x = 1; x <= gridSideLen - clusterSideLen - 1; x++)
    {
      for(let y = 1; y <= gridSideLen - clusterSideLen - 1; y++)
      {
        let clusterPower = 0;

        for(let xDel = 0; xDel < clusterSideLen; xDel++)
        {
          for(let yDel = 0; yDel < clusterSideLen; yDel++)
          {
            clusterPower += powers[x - 1 + xDel][y - 1 + yDel];
          }
        }

        if(clusterPower > bestClusterPower)
        {
          bestClusterPower = clusterPower;
          bestClusterPos = x + ',' + y + (requiredClusterSideLen ? '' : ',' + clusterSideLen);;
        }
      }
    }
  }

  return bestClusterPos;
}

function calcPower(x, y, gridSerialNum)
{
  let rackId = x + 10;
  return Math.floor((rackId * y + gridSerialNum) * rackId / 100) % 10 - 5;
}
