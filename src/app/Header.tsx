import Link from 'next/link';

/**
 * Renders all aspects of the website's header
 */
export default function Header() {
  return (
    <header>
      <div
        className='fixed left-0 right-0 top-0 z-50 w-screen bg-white shadow-sm dark:bg-slate-800'
        style={{
          padding: '0 max(calc((100vw - var(--max-w-screen-xl))/2), 1rem)',
        }}
      >
        <nav className='mx-auto flex h-16 w-full items-baseline justify-between py-4 xl:max-w-screen-xl'>
          <Link
            className='text-3xl font-bold text-sky-800 dark:text-slate-100'
            href='/'
          >
            MTG Grizzly
          </Link>

          <div className='flex gap-6 lg:gap-12'>
            <PrimaryNavLink href='/sets'>Sets</PrimaryNavLink>

            <PrimaryNavLink href='/about'>About</PrimaryNavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

type PrimaryNavLinkProps = {
  /**
   * Text to render for the link
   */
  children: string;
  /**
   * Destination to pass to href property
   */
  href: string;
};

/**
 * Renders primary nav links with consistent styling
 */
function PrimaryNavLink(props: PrimaryNavLinkProps) {
  const { children, href } = props;

  return (
    <Link
      className='text-xl font-bold text-sky-800 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-300'
      href={href}
    >
      {children}
    </Link>
  );
}
