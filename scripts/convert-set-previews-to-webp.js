/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * BLAH BLAH
 */

const { execSync } = require('child_process');
const { getSetsJSON } = require('./utils');

const sets = getSetsJSON();

/**
 * BLAH BLAH
 */

sets.forEach((set, index) => {
  console.log(`[${index + 1}/${sets.length}] Processing ${set.name}.`);

  execSync(
    `cwebp ${__dirname}/../public/set-previews/${set.code}.jpg -o ${__dirname}/../public/set-previews/320/${set.code}.webp -af -q 100 -hint picture -jpeg_like -resize 320 0`
  );

  execSync(
    `cwebp ${__dirname}/../public/set-previews/${set.code}.jpg -o ${__dirname}/../public/set-previews/384/${set.code}.webp -af -q 100 -hint picture -jpeg_like -resize 384 0`
  );
});
