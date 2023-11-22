/**
 * Creates directories for all the assets necessary for each set
 *
 * Example resulting structure:
 *   /public
 *     /sets
 *       /woe
 *         /preview
 *           /320.png
 *           /384.png
 *         /png
 *           /Gingerbrute.png
 *         /webp
 *           /320
 *             /Gingerbrute.png
 */

const { execSync } = require('child_process');
const { getSetsJSON } = require('./utils');

const sets = getSetsJSON();

sets.forEach((set, index) => {
  console.log(`[${index + 1}/${sets.length}] Processing ${set.name}.`);

  execSync(`mkdir ${__dirname}/../public/sets/${set.code}`);
  execSync(`mkdir ${__dirname}/../public/sets/${set.code}/png`);
  execSync(`mkdir ${__dirname}/../public/sets/${set.code}/preview`);
  execSync(`mkdir ${__dirname}/../public/sets/${set.code}/webp`);
});
