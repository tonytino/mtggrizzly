/**
 * I've renamed this from loading.tsx for now as this causes the lighthouse performance metric to drop from 80 to 64, which appears to be largely driven by the LCP impact of the card images being dynamically rendered.
 *
 * Here's the warning from lighthouse about this:
 *
 * "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements."](https://web.dev/articles/optimize-lcp?utm_source=lighthouse&utm_medium=devtools#optimize-when-the-resource-is-discovered)
 *
 * I'll rename this back once the changes necessary to prevent the lighthouse
 * hit are ready.
 */

import * as React from 'react';

export default function Loading() {
  return (
    <React.Fragment>
      <h1 className='mb-4 text-3xl font-bold text-sky-800 dark:text-slate-100 xl:mb-8'>
        Loading Set...
      </h1>

      <div className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8'>
        {Array(9)
          .fill(null)
          .map((_, index) => {
            return (
              <div
                className='mx-auto h-[453px] w-[325px] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-400'
                key={index}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
}
