/**
 * This script is for programmatically downloading all set preview images
 */

const { writeFile } = require('fs');
const { getSetsJSON } = require('./utils');
const path = require('path');

let promises = [];
let setsProcessed = 0;

const sets = getSetsJSON();

/**
 * Downloads and saves the preview art for each set in
 *   /public/sets/{set.code}/preview/original.jpg
 */
function fetchAndSaveSetPreviewArt({ code, name, preview_card }, index) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        async () => {
          console.log(
            `[${index + 1}/${sets.length}] Downloading art for: ${name}`
          );

          const { preview_art } = preview_card;

          const response = await fetch(preview_art);
          const imageBuffer = await response.arrayBuffer();

          writeFile(
            path.join(
              __dirname,
              '..',
              'public',
              'sets',
              code,
              'preview',
              'original.jpg'
            ),
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
