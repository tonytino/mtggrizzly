import { headers } from 'next/headers';
import * as React from 'react';
import { SetSelect } from '@/components';

async function getSets() {
  const reqHeaders = headers();
  const host = reqHeaders.get('host') ?? 'localhost:3000';
  const securityProtocol = host.includes('localhost') ? 'http' : 'https';
  const res = await fetch(`${securityProtocol}://${host}/api/sets`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/**
 * The Home Page
 */
async function Home() {
  const { sets } = await getSets();

  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold'>MTG Grizzly</h1>

      <h2 className='text-3xl font-semibold'>Select a set to get started:</h2>

      <SetSelect sets={sets ?? []} />
    </React.Fragment>
  );
}

export default Home;
