import { headers } from 'next/headers';
import * as React from 'react';
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
 * The Set Page
 */
async function SetPage({
  params, // searchParams,
}: {
  params: { set: string };
  // searchParams: { name: string };
}) {
  const { set } = params;
  const { sets } = await getSets();

  const setName = sets.find(({ code }) => code === set)?.name ?? 'Weird...';

  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold'>
        {setName} ({set?.toUpperCase()})
      </h1>
    </React.Fragment>
  );
}

export default SetPage;
