# MTG Grizzly

## Getting Started

1. Install the dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Visit the site via your browser at [localhost:3000](http://localhost:3000)

- [Home Page (Set Selection)](http://localhost:3000)
- [Example Set Page (Lost Caverns of Ixalan)](http://localhost:3000/sets/lci)

## Resources

### MTG Grizzly Specific

- [GitHub Repo]
- [Project Board]
- [Vercel Dashboard]

### General

- [Next.js Documentation]
- [Learn Next.js Tutorial]
- [Next.js Deployment Documentation]
- [Tailwind Documentation]

## Notes

- This project is hosted on [Vercel](https://vercel.com/tonytino/mtggrizzly)
- This project has [fast refresh](https://nextjs.org/docs/architecture/fast-refresh) enabled
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font
- This project leverages [Next.js' app router](https://nextjs.org/docs#app-router-vs-pages-router)
- This project leverages [Tailwind CSS](https://tailwindcss.com)
- This project leverages Radix's [Primitives](https://www.radix-ui.com/primitives) and [Icons](https://www.radix-ui.com/icons)
- This project leverages the [Scryfall API](https://scryfall.com/docs/api)
- This project adheres to the [Conventional Commits] specification
- ⚠️ **This project must remain in compliance with [Scryfall's Guidelines](https://scryfall.com/docs/api#use-of-scryfall-data-and-images)**
- ⚠️ **This project must remain in compliance with [WOTC's Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy)**

### Aliases

The project has [various aliases](https://github.com/tonytino/mtggrizzly/blob/30ad0c687f2011a4dcb007369071a32d89b9d667/tsconfig.json#L19-L25) configured for your importing needs.

```tsx
import { Card } from '@/components';
import type { DraftSet } from '@/types';
import sets from '@/root/src/app/api/sets/sets.json';
import sets from '@/src/app/api/sets/sets.json';
import { React, render, screen, userEvent } from 'test-utils';
```

**Please avoid relative imports that require traversing directories.** Some examples:

```tsx
// 👎
import CardsQueryContext from './../CardsQueryContext';
import CardsQueryContext from './components/CardsQueryContext';
import { SearchFilter } from './components/SearchFilter';

// 👍
import CardsQueryContext from './CardsQueryContext';
import CardsQueryContext from '@/src/app/sets/[set]/CardsQueryContext';
import { SearchFilter } from './components';
```

### READMEs

There are READMEs throughout the codebase to help document important information close to where it matters.

Below are links to all of the READMEs:

- [API README](./src/app/api/README.md)
- [App README](./src/app/README.md)
- [Components README](./src/components/README.md)
- [Cypress README](./cypress/README.md)
- [Scripts README](./scripts/README.md)
- [Types README](./types/README.md)
- [Utils README](./utils/README.md)

## Contributing

1. Check out the [Project Board] or [Project Issues] for available tasks
2. Check out the [Project Notes](https://github.com/tonytino/mtggrizzly#notes)
3. Open a pull request with your changes and references the issue you're working on (e.g. "Resolves #01234")

### Testing

- Test features first and foremost; this is the bare minimum coverage expected
- Do not test functionality already tested for us, e.g. if we're using a package we know has good test coverage, don't waste your time verifying it does what we expect
- Familiarize yourself with the [common mistakes made when using @testing-library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- Familiarize yourself with [Cypress' best practices](https://docs.cypress.io/guides/references/best-practices)
- Produce structured test suite outputs using `describe` (see existing tests for examples)
- We leverage both cypress and jest for testing purposes

<!-- LINK REFERENCES -->

[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0/#summary
[GitHub Repo]: https://github.com/tonytino/mtggrizzly
[Learn Next.js Tutorial]: https://nextjs.org/learn
[Next.js Deployment Documentation]: https://nextjs.org/docs/deployment
[Next.js Documentation]: https://nextjs.org/docs
[Project Board]: https://github.com/users/tonytino/projects/4/views/1
[Project Issues]: https://github.com/tonytino/mtggrizzly/issues
[Tailwind Documentation]: https://tailwindcss.com/docs/installation
[Vercel Dashboard]: https://vercel.com/tonytino/mtggrizzly