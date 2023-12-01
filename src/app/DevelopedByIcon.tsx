'use client';

import Link from 'next/link';
// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { LaptopIcon } from '@radix-ui/react-icons';

const label = 'Developed by brbcoding.com';

/**
 * Renders a laptop icon that links to brbcoding.com
 */
export default function DevelopedByIcon() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Link
          aria-label={label}
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

      <Tooltip.Content
        aria-label={label}
        className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-sm dark:bg-slate-50 dark:text-sky-800'
      >
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
