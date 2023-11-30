'use client';

import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import { LaptopIcon } from '@radix-ui/react-icons';

export default function ScrollToTopIcon() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Link
          href='https://brbcoding.com'
          rel='noreferrer'
          target='_blank'
        >
          <LaptopIcon
            className='cursor-pointer text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
            height='36px'
            width='36px'
          />
        </Link>
      </Tooltip.Trigger>

      <Tooltip.Content className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-sm dark:bg-slate-50 dark:text-sky-800'>
        Developed by brbcoding.com
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
