import { PATH_TO_SOURCE, PATH_TO_DIST, PATH_TO_RAW } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;
import sharp from 'gulp-sharp-responsive';
import { stacksvg } from 'gulp-stacksvg';
import svgo from 'gulp-svgmin';

export function optimizeRaster() {
  const RAW_DENSITY = 2;
  const TARGET_FORMATS = [undefined, 'webp', 'avif']; // undefined — initial format: jpg or png

  function createOptionsFormat() {
    const formats = [];

    for (const format of TARGET_FORMATS) {
      for (let density = RAW_DENSITY; density > 0; density--) {
        formats.push(
          {
            format,
            rename: { suffix: `@${density}x` },
            width: ({ width }) => Math.ceil(width * density / RAW_DENSITY),
            jpegOptions: { progressive: true },
          },
        );
      }
    }
    return { formats };
  }

  return src(`${PATH_TO_RAW}img/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`${PATH_TO_SOURCE}img`));
}

export function optimizeVector() {
  return src([`${PATH_TO_RAW}**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_SOURCE));
}

export function sprite() {
  return src(`${PATH_TO_SOURCE}img/sprite/**/*.svg`)
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(dest(`${PATH_TO_DIST}img`));
}
