import { headers } from 'next/headers';
import * as React from 'react';
import { SetSelect } from '@/components';
import type { SetsResponse } from '@/types';

async function getSets(): Promise<SetsResponse> {
  const reqHeaders = headers();
  const host = reqHeaders.get('host') ?? 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/sets`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/**
 * The Home Page
 */
async function HomePage() {
  const { sets } = await getSets();

  return (
    <React.Fragment>
      <SetSelect sets={sets ?? []} />
    </React.Fragment>
  );
}

export default HomePage;
