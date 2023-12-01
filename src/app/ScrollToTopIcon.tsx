'use client';

// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThickArrowUpIcon } from '@radix-ui/react-icons';

/**
 * Renders an up arrow icon that scrolls to the top of the page on click
 */
export default function ScrollToTopIcon() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ThickArrowUpIcon
          className='mt-[3px] cursor-pointer text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
          height='36px'
          onClick={() =>
            window.scrollTo({
              behavior: 'smooth',
              left: 0,
              top: 0,
            })
          }
          width='36px'
        />
      </Tooltip.Trigger>

      <Tooltip.Content className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-sm dark:bg-slate-50 dark:text-sky-800'>
        Scroll to top
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
