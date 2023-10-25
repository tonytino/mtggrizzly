'use client';
import * as React from 'react';

/**
 * Renders a select element and a button to load the cards for that set
 *
 * @example
 * <SetSelect />
 */
export function SetSelect() {
  const [selectedSet, setSelectedSet] = React.useState('');

  return (
    <section className='flex w-80 flex-col gap-2'>
      <label htmlFor='set-select'>Choose a set:</label>

      <select
        className='p-2 text-black'
        name='sets'
        id='set-select'
        value={selectedSet}
        onChange={(event) => {
          setSelectedSet(event.target.value);
        }}
      >
        <option value=''>Select A Set</option>
        <option value='dog'>Dog</option>
        <option value='cat'>Cat</option>
        <option value='hamster'>Hamster</option>
        <option value='parrot'>Parrot</option>
        <option value='spider'>Spider</option>
        <option value='goldfish'>Goldfish</option>
        <option value='mom'>March of the Machine</option>
      </select>

      <button className='rounded border-2 border-solid border-indigo-600 p-2'>
        Go
      </button>
    </section>
  );
}
