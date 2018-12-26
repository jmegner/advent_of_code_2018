/*
author: Jacob Egner
date:   2018-12-25
repo:   https://github.com/jmegner/advent_of_code_2018
*/

const _ = require('lodash');
const common = require('./common.js');


(function main() {
  var chars = common.readLines('day05_input.txt')[0].split('');

  common.check(part1, chars, 9202);
  common.check(part2, chars, 6394);
  console.debug('end');
})();


function part1(chars)
{
  let prevChars = null;

  do
  {
    prevChars = chars;
    chars = afterOneReactionPass(chars);
  }
  while(chars.length < prevChars.length);

  return chars.length;
}

function part2(chars)
{
  return _.min(getUsedLetters(chars).map(
    letter => part1(getCharsWithoutLetter(chars, letter))));
}

function afterOneReactionPass(chars)
{
  let newChars = [];

  for(let i = 0; i < chars.length; i++)
  {
    if(i === chars.length - 1
      || chars[i] === chars[i + 1]
      || chars[i].toLowerCase() !== chars[i + 1].toLowerCase())
    {
      newChars.push(chars[i]);
    }
    else
    {
      i++; // extra advance because we are not adding current or next char
    }
  }

  return newChars;
}

function getUsedLetters(chars)
{
  let usedLetters = new Set();

  for(let char of chars)
  {
    usedLetters.add(char.toLowerCase());

    if(usedLetters.size >= 26)
    {
      break;
    }
  }

  return Array.from(usedLetters);
}

function getCharsWithoutLetter(chars, letterToOmit)
{
  return chars.filter(char => char.toLowerCase() != letterToOmit);
}
