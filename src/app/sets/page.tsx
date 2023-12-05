import * as React from 'react';
import { Set } from '@/components';
import sets from '@/src/app/api/sets/sets.json';

/**
 * The Sets Page
 */
async function SetsPage() {
  const setsToShow = sets.filter((set) => set.show);

  return (
    <div className='m-auto grid h-min grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {setsToShow.map((set) => {
        return (
          <Set
            key={set.code}
            set={set}
          />
        );
      })}
    </div>
  );
}

export default SetsPage;
