/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
notes:
  During this exercise, I tried out pycollections and the Counter class was astonishingly slow,
  like 100K times slower than my poor man's Counter-via-object.
*/

const _ = require('lodash');
const common = require('./common.js');


class Claim
{
  constructor(text)
  {
    let nums = text.split(/\D+/).map(Number);
    this.id = nums[1];
    this.xBegin = nums[2];
    this.yBegin = nums[3];
    this.xLen = nums[4];
    this.yLen = nums[5];
  }

  get xEnd() { return this.xBegin + this.xLen; }
  get yEnd() { return this.yBegin + this.yLen; }
}


(function main() {
  const claims = common.readLines('day03_input.txt').map(line => new Claim(line));
  const cellClaimers = getCellClaimers(claims);
  common.check(part1, cellClaimers, 115242);
  common.check(part2, cellClaimers, 1046);
  console.debug("end");
})();


function part1(cellClaimers)
{
  return Object.values(cellClaimers)
    .map(claimIdSet => claimIdSet.size)
    .filter(size => size >= 2)
    .length;
}

function part2(cellClaimers)
{
  let overlappingClaimers = new Set();
  let possibleNonoverlappingClaimers = new Set();

  for(let claimerSet of Object.values(cellClaimers))
  {
    if(claimerSet.size == 1)
    {
      possibleNonoverlappingClaimers.add(claimerSet.values().next().value);
    }
    else
    {
      claimerSet.forEach(claimId => overlappingClaimers.add(claimId));
    }
  }

  overlappingClaimers.forEach(claimId => possibleNonoverlappingClaimers.delete(claimId));

  return possibleNonoverlappingClaimers.values().next().value;
}

function getCellClaimers(claims)
{
  let cellClaimers = {}; // map cell coord string to set of claim ids

  for(let claim of claims)
  {
    for(let x = claim.xBegin; x < claim.xEnd; x++)
    {
      for(let y = claim.yBegin; y < claim.yEnd; y++)
      {
        let cellStr = x + ',' + y;
        cellClaimers[cellStr] = (cellClaimers[cellStr] || new Set()).add(claim.id);
      }
    }
  }

  return cellClaimers;
}