/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const _ = require('lodash');
const common = require('./common.js');


class Point
{
  constructor(textOrX, y, vx, vy)
  {
    if(arguments.length == 1)
    {
      let nums = textOrX.split(/[^-\d]+/).map(Number);
      this.x = nums[1];
      this.y = nums[2];
      this.vx = nums[3];
      this.vy = nums[4];
    }
    else if (arguments.length == 4)
    {
      this.x = textOrX;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
    }
    else
    {
      throw new Error("bad num args")
    }

    Object.freeze(this);
  }

  shifted(xDel, yDel)
  {
    return new Point(this.x + xDel, this.y + yDel, this.vx, this.vy)
  }

  afterMove()
  {
    return this.shifted(this.vx, this.vy);
  }

  static posString(x, y)
  {
    return x + ',' + y;
  }

  toPosString()
  {
    return Point.posString(this.x, this.y);
  }

}

(function main() {
  var points = common.readObjects('day10_input.txt', Point);

  //common.check(part1, treeVals);
  //common.check(part2, treeVals);
  part1(points); // 10886 ZZCBGGCJ
  console.debug('end');
})();


function part1(points)
{
  let bestTick = -1;
  let bestMinDimension = 9e99;
  let bestPoints = null;

  for(let tick = 1; tick < 12000; tick++)
  {
    points = points.map(point => point.afterMove());

    let posSet = pointsToPosSet(points);
    let minDimension = _.min(calcWidthAndHeight(points));

    if(minDimension < bestMinDimension)
    {
      bestMinDimension = minDimension;
      bestTick = tick;
      bestPoints = points;
    }

    /*
    if(tick % 500 === 1)
    {
      console.debug(
        't=' + tick
        + ', d=' + minDimension
        + ', bt=' + bestTick
        + ', bd=' + bestMinDimension
      );
    }
    */
  }

  console.log("part1: best tick = " + bestTick);
  printPoints(bestPoints);
}

function part2(points)
{
}

function pointsToPosSet(points)
{
  return new Set(points.map(point => point.toPosString()));
}

function calcWidthAndHeight(points)
{
  return [
    _.maxBy(points, 'x').x - _.minBy(points, 'x').x,
    _.maxBy(points, 'y').y - _.minBy(points, 'y').y
  ];
}

function printPoints(points)
{
  let xMin = _.minBy(points, 'x').x;
  let xMax = _.maxBy(points, 'x').x;
  let yMin = _.minBy(points, 'y').y;
  let yMax = _.maxBy(points, 'y').y;
  let relativePosSet = new Set(points.map(point => point.shifted(-xMin, -yMin).toPosString()));

  for(let y = 0; y <= yMax - yMin; y++)
  //for(let y = yMax - yMin; y >= 0; y--)
  {
    let lineChars = [];

    for(let x = 0; x <= xMax - xMin; x++)
    {
      lineChars.push(relativePosSet.has(Point.posString(x, y)) ? '#' : '.');
    }
    console.log(lineChars.join(''));
  }
}