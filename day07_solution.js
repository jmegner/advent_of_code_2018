/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const _ = require('lodash');
const common = require('./common.js');

class Req
{
  constructor(text)
  {
    if(arguments.length === 1)
    {
      this.a = text[5];
      this.b = text[36];
    }
    else
    {
      this.a = arguments[0];
      this.b = arguments[1];
    }

    Object.freeze(this);
  }

  toString()
  {
    return this.a + this.y;
  }
}


(function main() {
  var reqs = common.readLines('day07_input.txt').map(line => line[5] + line[36]);

  common.check(part1, reqs, 'FHMEQGIRSXNWZBCLOTUADJPKVY');
  common.check(part2, reqs);
  console.debug('end');
})();


function part1(reqs)
{
  let reqsRemaining = reqs.slice();
  let stepsCompleted = '';

  let stepsRemaining = new Set();
  reqs.forEach(req => {
    stepsRemaining.add(req[0]);
    stepsRemaining.add(req[1]);
  });

  while(stepsRemaining.size > 0)
  {
    let bestStep = getBestStep(stepsRemaining, reqsRemaining);
    stepsCompleted += bestStep;
    stepsRemaining.delete(bestStep);
    reqsRemaining = reqsPrunedOfStep(reqsRemaining, bestStep);
  }

  return stepsCompleted;
}

function part2(reqs)
{
  return getCompletionOrderAndTime(reqs, 5)[1];
}

function getCompletionOrderAndTime(reqs, numWorkers)
{
  let reqsRemaining = reqs.slice();
  let stepsCompleted = '';
  let currTimeTick = 0;
  let workerSteps = new Array(numWorkers).fill(null);
  let workerTicksRemaining = new Array(numWorkers).fill(0);

  let stepsRemaining = new Set();
  reqs.forEach(req => {
    stepsRemaining.add(req[0]);
    stepsRemaining.add(req[1]);
  });

  do
  {
    // assign steps to workers if possible
    for(let workerIdx = 0; workerIdx < numWorkers; workerIdx++)
    {
      if(workerSteps[workerIdx] === null)
      {
        // try to find available step
        let bestStep = getBestStep(stepsRemaining, reqsRemaining);

        if(bestStep)
        {
          workerSteps[workerIdx] = bestStep;
          workerTicksRemaining[workerIdx] = getTicksForStep(bestStep);
          stepsRemaining.delete(bestStep);
        }
        else // else no available step no, so break worker-assignment loop
        {
          break;
        }
      }
    }

    // workers work during time tick
    currTimeTick++;
    workerTicksRemaining = workerTicksRemaining.map(numTicks => numTicks - 1);

    // TODO: handle completed steps

  }
  while(workerSteps.some(step => step !== null));

  while(stepsRemaining.size > 0)
  {
    let bestStep = getBestStep(stepsRemaining, reqsRemaining);
    stepsCompleted += bestStep;
    stepsRemaining.delete(bestStep);
    reqsRemaining = reqsPrunedOfStep(reqsRemaining, bestStep);
  }

  return [stepsCompleted, currTimeTick];
}

function getBestStep(stepsRemaining, reqs)
{
  let stepsWithoutPrereq = new Set(stepsRemaining);
  reqs.forEach(req => stepsWithoutPrereq.delete(req[1]));
  return _.min(Array.from(stepsWithoutPrereq.values()));
}

function reqsPrunedOfStep(reqs, step)
{
  return reqs.filter(req => req[0] !== step);
}
