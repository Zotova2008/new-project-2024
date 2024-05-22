export const PATH_TO_SOURCE = './source/';
export const PATH_TO_DIST = './build/';
export const PATH_TO_RAW = './raw/';
export const PATHS_TO_STATIC = [
  `${PATH_TO_SOURCE}fonts/**/*.{woff2,woff}`,
  `${PATH_TO_SOURCE}*.ico`,
  `${PATH_TO_SOURCE}*.webmanifest`,
  `${PATH_TO_SOURCE}favicons/*.{png,svg}`,
  `${PATH_TO_SOURCE}lib/**/*`,
  `${PATH_TO_SOURCE}images/**/*`,
  `${PATH_TO_SOURCE}data/**/*`,
  `!${PATH_TO_SOURCE}images/svg/**/*`,
  `!${PATH_TO_SOURCE}**/README.md`,
];

export const isDevelopment = true;
