/**
 * Converts jpg set preview images to webp (creating two diff sizes) using cwebp: https://developers.google.com/speed/webp/docs/cwebp
 *
 * Ensures consistent in ratios of resulting images using imagemagick: https://imagemagick.org/script/convert.php
 */

const { execSync } = require('child_process');
const { getSetsJSON } = require('./utils');

const sets = getSetsJSON();

sets.forEach((set, index) => {
  console.log(`[${index + 1}/${sets.length}] Processing ${set.name}.`);

  /**
   * First, we'll convert the original to webp format (with two diff sizes)
   */
  execSync(
    `cwebp \
      ${__dirname}/../public/sets/${set.code}/preview/original.jpg \
      -o ${__dirname}/../public/sets/${set.code}/preview/480.webp \
      -af \
      -hint picture \
      -resize 480 0`
  );

  execSync(
    `cwebp \
      ${__dirname}/../public/sets/${set.code}/preview/original.jpg \
      -o ${__dirname}/../public/sets/${set.code}/preview/576.webp \
      -af \
      -hint picture \
      -resize 576 0`
  );

  /**
   * Then, we'll crop the images to ensure a consistent image ratio (cwebp's crop feature will occur before resizing, but we need to do it after)
   */
  execSync(
    `convert \
      ${__dirname}/../public/sets/${set.code}/preview/480.webp \
      -crop 480x351+0+0 \
      ${__dirname}/../public/sets/${set.code}/preview/480.webp`
  );

  execSync(
    `convert \
      ${__dirname}/../public/sets/${set.code}/preview/576.webp \
      -crop 576x421+0+0 \
      ${__dirname}/../public/sets/${set.code}/preview/576.webp`
  );
});
