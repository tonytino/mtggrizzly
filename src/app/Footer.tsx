import Link from 'next/link';
import DevelopedByIcon from './DevelopedByIcon';
import GitHubIcon from './GitHubIcon';
import ScrollToTopIcon from './ScrollToTopIcon';

/**
 * Renders all aspects of the website's footer
 */
function Footer() {
  return (
    <footer
      className='mx-auto bg-slate-100 text-xs text-slate-800 dark:bg-slate-900 dark:text-slate-100'
      data-testid='Footer'
      style={{
        padding: '1rem max(calc((100vw - var(--max-w-screen-xl))/2), 1rem)',
      }}
    >
      <div className='mb-4 flex flex-wrap items-start justify-between'>
        <Link
          className='mb-4 mr-8 text-3xl font-bold text-sky-800 dark:text-slate-100'
          href='/'
          rel='noreferrer'
          title='Developed by brbcoding.com'
        >
          MTG Grizzly
        </Link>

        <div className='flex gap-8'>
          <GitHubIcon />

          <DevelopedByIcon />

          <ScrollToTopIcon />
        </div>
      </div>

      <Disclaimers />
    </footer>
  );
}

function Disclaimers() {
  return (
    <div className='flex w-full flex-col gap-4 md:max-w-[80%] lg:max-w-[50%]'>
      <p>
        This project leverages assets, information, and aspects of&nbsp;
        <MagicTheGathering /> in order to produce unofficial Fan Content in
        accordance with&nbsp;
        <WizardsOfTheCoast />
        &apos;s&nbsp;
        <WizardsOfTheCoastFanContentPolicy />, which are copyright of&nbsp;
        <WizardsOfTheCoast />, LLC, the majority of which comes from&nbsp;
        <Scryfall />
        &nbsp;and is used in adherence with their&nbsp;
        <Link
          className='font-semibold text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
          href='https://scryfall.com/docs/api#use-of-scryfall-data-and-images'
          rel='noreferrer'
          target='_blank'
        >
          guidelines
        </Link>
        .
      </p>

      <p>
        MTG Grizzly is unofficial Fan Content permitted under the&nbsp;
        <WizardsOfTheCoastFanContentPolicy />. Not approved/endorsed by Wizards.
        Portions of the materials used are property of <WizardsOfTheCoast />.
        ©&nbsp;
        <WizardsOfTheCoast />, LLC.
      </p>

      <p>
        This project is completely unaffiliated with, unrelated to, and in no
        way is endorsed by either <WizardsOfTheCoast />, LLC nor <Scryfall />,
        LLC. Special thanks to&nbsp;
        <Scryfall />
        &nbsp;and&nbsp;
        <WizardsOfTheCoast />
        &nbsp;for making this project possible.
      </p>

      <p>
        Any and all original content presented on this page and website are ©
        2023 MTG Grizzly. All rights reserved.
      </p>
    </div>
  );
}

function MagicTheGathering() {
  return (
    <Link
      className='font-semibold text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
      href='https://magic.wizards.com/'
      rel='noreferrer'
      target='_blank'
    >
      Magic: The Gathering
    </Link>
  );
}

function Scryfall() {
  return (
    <Link
      className='font-semibold text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
      href='https://scryfall.com/'
      rel='noreferrer'
      target='_blank'
    >
      Scryfall
    </Link>
  );
}

function WizardsOfTheCoast() {
  return (
    <Link
      className='font-semibold text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
      href='https://company.wizards.com/'
      rel='noreferrer'
      target='_blank'
    >
      Wizards of the Coast
    </Link>
  );
}

function WizardsOfTheCoastFanContentPolicy() {
  return (
    <Link
      className='font-semibold text-sky-800 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
      href='https://company.wizards.com/en/legal/fancontentpolicy'
      rel='noreferrer'
      target='_blank'
    >
      Fan Content Policy
    </Link>
  );
}

export default Footer;
