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

const nextConfig = {
  images: {
    ...dangerouslyAllowSvg,
    remotePatterns: [scryfallSvgsApi],
  },
};

module.exports = nextConfig;
