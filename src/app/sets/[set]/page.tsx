import * as React from 'react';

export default function Page({
  params,
  searchParams,
}: {
  params: { set: string };
  searchParams: { name: string };
}) {
  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold'>
        {searchParams.name} ({params.set?.toUpperCase()})
      </h1>
    </React.Fragment>
  );
}
