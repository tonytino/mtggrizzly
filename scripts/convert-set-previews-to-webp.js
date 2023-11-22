/**
 * Converts jpg set preview images to webp in both 320w and 384w sizes using
 * cwebp: https://developers.google.com/speed/webp/docs/cwebp
 */

const { execSync } = require('child_process');
const { getSetsJSON } = require('./utils');

const sets = getSetsJSON();

sets.forEach((set, index) => {
  console.log(`[${index + 1}/${sets.length}] Processing ${set.name}.`);

  execSync(
    `cwebp \
      ${__dirname}/../public/sets/${set.code}/preview/original.jpg \
      -o ${__dirname}/../public/sets/${set.code}/preview/320.webp \
      -af \
      -hint picture \
      -resize 320 0`
  );

  execSync(
    `cwebp \
      ${__dirname}/../public/sets/${set.code}/preview/original.jpg \
      -o ${__dirname}/../public/sets/${set.code}/preview/384.webp \
      -af \
      -hint picture \
      -resize 384 0`
  );
});
