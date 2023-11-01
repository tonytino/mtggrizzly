/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This script is for programmatically modifying sets.json to have preview art
 */

const { readFileSync, writeFileSync } = require('fs');

const SETS_JSON_PATH = `${__dirname}/../src/app/api/sets/sets.json`;
let promises = [];
let setsProcessed = 0;

/**
 * Takes a given set object from sets.json as well as an index and returns a promise that fetches a random card for that set from scryfall (while avoiding rate limiting)
 *
 * The random card is used as preview art for the set (and is saved in sets.json)
 */
function fetchSetPreviewArtAndModifySetObject(set, index) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        async () => {
          console.log(
            `[${index + 1}/${sets.length}]  Fetching art for: ${set.name}`
          );

          const queryForRandomCardFromSet = `https://api.scryfall.com/cards/random?q=set:${set.code}`;

          const response = await fetch(queryForRandomCardFromSet);
          const randomCardFromSet = await response.json();

          console.log(`\t Random card selected: ${randomCardFromSet.name}`);

          const { image_uris = {} } = randomCardFromSet;
          const { art_crop = '' } = image_uris;

          if (art_crop) {
            set.preview_art = art_crop;
          }

          setsProcessed++;

          resolve();
        },
        index * 1000 + index // This is enough time to prevent rate limiting
      );
    } catch (error) {
      console.error(
        `An error has been encountered while fetching a card for ${set.code}: ${error}`
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

sets.map((set, index) =>
  promises.push(fetchSetPreviewArtAndModifySetObject(set, index))
);

(async () => {
  try {
    await Promise.all(promises);

    console.log(
      'All sets processed. Total sets processed successfully: ',
      setsProcessed
    );

    console.log('Attempting to save sets.json.');

    writeFileSync(SETS_JSON_PATH, JSON.stringify(sets, null, 2));

    console.log('Job completed successfully.');
  } catch (error) {
    console.error('We encountered an error: ', error);
  }
})();
