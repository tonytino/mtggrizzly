/* eslint-disable @typescript-eslint/no-var-requires */

const { readFileSync } = require('fs');

const SETS_JSON_PATH = `${__dirname}/../src/app/api/sets/sets.json`;

/**
 * Read and parse the Sets JSON
 */
function getSetsJSON() {
  const setsJson = readFileSync(SETS_JSON_PATH);
  const sets = JSON.parse(setsJson);

  console.log('Number of sets found:', sets.length);

  return sets;
}

module.exports = {
  getSetsJSON,
  SETS_JSON_PATH,
};
