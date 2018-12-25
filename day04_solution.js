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


class Record
{
  constructor(text)
  {
    let nums = text.split(/\D+/).map(Number);
    let minute = nums[5];

    this.time = text.slice(1, text.indexOf(']'));

    if(text.indexOf('Guard') > -1)
    {
      this.guard = nums[6];
    }
    else if(text.indexOf('asleep') > -1)
    {
      this.minuteSleep = minute;
    }
    else if(text.indexOf('wakes') > -1)
    {
      this.minuteWake = minute;
    }
    else
    {
      throw new Error("weird record text");
    }
  }

}


(function main() {
  var recs = common.readObjects('day04_input.txt', Record);
  recs = _.sortBy(recs, 'time');
  const sleepHistos = getSleepHistos(recs);
  //console.debug(common.readLines('day04_input.txt').sort());

  common.check(part1, sleepHistos, 72925);
  common.check(part2, sleepHistos, 49137);
  console.debug('end');
})();


function part1(sleepHistos)
{
  let guardWithMostTotalSleep = _.maxBy(
    Object.entries(sleepHistos),
    guardThenSleepHisto => getHistoSum(guardThenSleepHisto[1]))[0];

  let mostFrequentlySleepingMinute = getMaxValKey(sleepHistos[guardWithMostTotalSleep]);

  return guardWithMostTotalSleep * mostFrequentlySleepingMinute;
}

function part2(sleepHistos)
{
  /**
  // this snippet works but is not very readable
  let [bestGuard, bestMinute, bestCount] = _.maxBy(
    Object.entries(sleepHistos).map(entry => [entry[0]].concat(getMaxValEntry(entry[1]))),
    '2');
  /**/

  /**/
  let bestGuard = null;
  let bestMinute = null;
  let bestCount = -1;

  for(let [guard, histo] of Object.entries(sleepHistos))
  {
    let [goodMinute, goodCount] = getMaxValEntry(histo);

    if(goodCount > bestCount)
    {
      bestGuard = guard;
      bestMinute = goodMinute;
      bestCount = goodCount;
    }
  }
  /**/

  return bestGuard * bestMinute;
}

function getSleepHistos(recs)
{
  let guardsSleepMinutes = {}; // map guard to map of minute to sleepCount
  let currGuard = NaN;
  let currMinuteSleep = NaN;

  for(let rec of recs)
  {
    if('guard' in rec)
    {
      currGuard = rec.guard;
    }
    else if ('minuteSleep' in rec)
    {
      currMinuteSleep = rec.minuteSleep;
    }
    else if ('minuteWake' in rec)
    {
      if(!guardsSleepMinutes[currGuard])
      {
        guardsSleepMinutes[currGuard] = {};
      }

      let sleepMinuteSet = guardsSleepMinutes[currGuard];

      for(let minute = currMinuteSleep; minute < rec.minuteWake; minute++)
      {
        sleepMinuteSet[minute] = (sleepMinuteSet[minute] || 0) + 1;
      }
    }
  }

  return guardsSleepMinutes;
}

function getHistoSum(histo)
{
  return _.sum(Object.values(histo));
}

function getMaxValEntry(histo)
{
  return _.maxBy(Object.entries(histo), entry => entry[1]);
}


function getMaxValKey(histo)
{
  return getMaxValEntry(histo)[0];
}

