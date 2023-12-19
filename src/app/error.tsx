'use client';
import * as React from 'react';

/**
 * The Top-level Error Page, catching anything and everything
 */
function TopLevelErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Should report to whatever tool is being used for monitoring purposes
    console.error(error);
  }, [error]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full max-w-5xl text-sm'>
        <div className='fixed bottom-0 left-0 flex h-48 w-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black'>
          <h1 className='text-3xl font-bold'>MTG Grizzly</h1>

          <h2 className='text-3xl font-semibold'>
            Something went terribly wrong, sorry!
          </h2>

          <h2 className='text-xl font-semibold'>
            Please share the following with us if you reach out about this.
          </h2>

          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>

          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Click me to reload and try again
          </button>
        </div>
      </div>
    </main>
  );
}

export default TopLevelErrorPage;
