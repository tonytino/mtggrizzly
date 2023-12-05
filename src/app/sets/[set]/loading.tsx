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
