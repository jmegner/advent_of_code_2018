/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const Deque = require('double-ended-queue');
const _ = require('lodash');
const common = require('./common.js');

class Coord
{
  constructor(textOrX, y)
  {
    if(arguments.length === 1)
    {
      let nums = textOrX.split(/\D+/).map(Number);
      this.x = nums[0];
      this.y = nums[1];
    }
    else
    {
      this.x = textOrX;
      this.y = y;
    }

    Object.freeze(this);
  }

  toMinimalString()
  {
    return this.x + ',' + this.y;
  }

  toString()
  {
    return '[' + this.x + ', ' + this.y + ']';
  }

  dist(other)
  {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  shifted(delX, delY)
  {
    return new Coord(this.x + delX, this.y + delY);
  }

  neighbors()
  {
    return [
      this.shifted(0, -1),
      this.shifted(0, 1),
      this.shifted(-1, 0),
      this.shifted(1, 0)
    ];
  }
}


(function main() {
  var spots = common.readObjects('day06_input.txt', Coord);

  common.check(part1, spots, 3660);
  common.check(part2, spots, 35928);
  common.check(part2b, spots, 35928);
  console.debug('end');
})();


function part1(spots)
{
  // populate cells within bounding rectangle and recognize that cells on the
  // bounding rectangle must be part of infinite regions, so exclude them

  let bounds = getBounds(spots);
  let regionSizes = new Array(spots.length).fill(0);
  let infiniteRegionSpots = new Set();

  for(let x = bounds.xMin; x <= bounds.xMax; x++)
  {
    for(let y = bounds.yMin; y <= bounds.yMax; y++)
    {
      let nearestSpotId = getNearestSpotId(x, y, spots);

      if(nearestSpotId > -1)
      {
        regionSizes[nearestSpotId]++;

        if(  x === bounds.xMin || x === bounds.xMax
          || y === bounds.yMin || y === bounds.yMax)
        {
          infiniteRegionSpots.add(nearestSpotId);
        }
      }
    }
  }

  return _.max(regionSizes.filter( (regionSize, spotId) => !infiniteRegionSpots.has(spotId) ));
}

function part2(spots)
{
  const maxDistSum = 9999;
  const padding = Math.ceil(maxDistSum / spots.length);
  const bounds = getBounds(spots, padding);
  let safeRegionSize = 0;

  for(let x = bounds.xMin; x <= bounds.xMax; x++)
  {
    for(let y = bounds.yMin; y <= bounds.yMax; y++)
    {
      const coord = new Coord(x, y);
      if(_.sumBy(spots, spot => spot.dist(coord)) <= maxDistSum)
      {
        safeRegionSize++;
      }
    }
  }

  return safeRegionSize;
}

function part2b(spots)
{
  // start at center of mass and explore outward
  const maxDistSum = 9999;
  let numSafeCells = 0;
  let startCoord = new Coord(
    Math.round(_.meanBy(spots, 'x')),
    Math.round(_.meanBy(spots, 'y')));
  let frontierCoords = new Deque([startCoord]);
  let seenCoords = new Set([startCoord.toMinimalString()]);

  while(!frontierCoords.isEmpty())
  {
    let coord = frontierCoords.dequeue();

    for(let neighbor of coord.neighbors())
    {
      if(_.sumBy(spots, spot => spot.dist(neighbor)) <= maxDistSum
        && !seenCoords.has(neighbor.toMinimalString()))
      {
        numSafeCells++;
        frontierCoords.enqueue(neighbor);
      }

      seenCoords.add(neighbor.toMinimalString());
    }
  }

  return numSafeCells;
}

function getBounds(coords, padding)
{
  padding = padding || 0;
  return {
    xMin: _.minBy(coords, 'x').x - padding,
    yMin: _.minBy(coords, 'y').y - padding,
    xMax: _.maxBy(coords, 'x').x + padding,
    yMax: _.maxBy(coords, 'y').y + padding
  };
}

function getNearestSpotId(x, y, spots)
{
  let coord = new Coord(x, y);
  let spotInfos = spots.map( (spot, spotId) => { return {spotId: spotId, dist: spot.dist(coord)}; } );
  let sortedSpotInfos = _.sortBy(spotInfos, 'dist');

  if(sortedSpotInfos[0].dist === sortedSpotInfos[1].dist)
  {
    return -1;
  }

  return sortedSpotInfos[0].spotId;
}