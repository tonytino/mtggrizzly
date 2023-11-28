import * as React from 'react';

/**
 * The About Page
 */
async function AboutPage() {
  return (
    <React.Fragment>
      <section className='flex max-w-3xl flex-col gap-8 py-16 text-slate-800 dark:text-slate-100'>
        <h2 className='text-xl font-bold'>What is MTG Grizzly?</h2>

        <p className='text-lg'>
          MTG Grizzly is a project seeking to improve the Magic: the Gathering
          limited experience by providing helpful tools and resources.
        </p>

        <p className='text-lg'>
          Please keep in mind that this project is still in the initial
          development phase and has many features on the way.
        </p>
      </section>
    </React.Fragment>
  );
}

export default AboutPage;
