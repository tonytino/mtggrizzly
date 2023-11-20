/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This script is for programmatically downloading all set preview images
 */

const { readFileSync, writeFile } = require('fs');
const path = require('path');

const SETS_JSON_PATH = `${__dirname}/../src/app/api/sets/sets.json`;
let promises = [];
let setsProcessed = 0;

/**
 * Downloads and saves the preview art for each set in /public/set-previews
 */
function fetchAndSaveSetPreviewArt({ code, name, preview_art }, index) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        async () => {
          console.log(
            `[${index + 1}/${sets.length}] Downloading art for: ${name}`
          );

          const response = await fetch(preview_art);
          const imageBuffer = await response.arrayBuffer();

          writeFile(
            path.join(`${__dirname}/../public/set-previews`, `${code}.jpg`),
            Buffer.from(imageBuffer),
            (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`Preview art for ${name} downloaded successfully.`);
              }
            }
          );

          setsProcessed++;

          resolve();
        },
        index * 1000 + index // This is enough time to prevent rate limiting
      );
    } catch (error) {
      console.error(
        `An error has been encountered while fetching the preview art for ${name}: ${error}`
      );

      reject(error);
    }
  });
}

/**
 * Access and parse the Sets JSON
 */

const setsJson = readFileSync(SETS_JSON_PATH);
const sets = JSON.parse(setsJson);

console.log('Number of sets found:', sets.length);

/**
 * Fetch and save all the set preview arts
 */

sets.map((set, index) => promises.push(fetchAndSaveSetPreviewArt(set, index)));

(async () => {
  try {
    await Promise.all(promises);

    console.log(
      'All sets processed. Total sets processed successfully: ',
      setsProcessed
    );

    console.log('Job completed successfully.');
  } catch (error) {
    console.error('We encountered an error: ', error);
  }
})();
