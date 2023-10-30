/** @type {import('next').NextConfig} */
/**
 * Configuration required to fetch set svgs from scryfall
 *
 * https://nextjs.org/docs/pages/api-reference/components/image#dangerouslyallowsvg
 */
const dangerouslyAllowSvg = {
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};

const scryfallSvgsApi = {
  protocol: 'https',
  hostname: 'svgs.scryfall.io',
};

const scryfallCardsApi = {
  protocol: 'https',
  hostname: 'cards.scryfall.io',
};

const nextConfig = {
  images: {
    ...dangerouslyAllowSvg,
    remotePatterns: [scryfallCardsApi, scryfallSvgsApi],
  },
  // Use the following to define custom headers for specific requests
  // https://nextjs.org/docs/app/api-reference/next-config-js/headers
  // async headers() {
  //   return [
  //     {
  //       source: '*svgs.scryfall.io*',
  //       headers: [
  //         {
  //           key: 'x-hello',
  //           value: 'there',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
