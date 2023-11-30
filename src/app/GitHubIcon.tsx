'use client';

import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function ScrollToTopIcon() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Link
          href='https://github.com/tonytino/mtggrizzly'
          rel='noreferrer'
          target='_blank'
        >
          <GitHubLogoIcon
            className='cursor-pointer text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
            height='36px'
            width='36px'
          />
        </Link>
      </Tooltip.Trigger>

      <Tooltip.Content className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-sm dark:bg-slate-50 dark:text-sky-800'>
        Proudly open-source
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
