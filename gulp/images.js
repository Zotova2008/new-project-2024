import { PATH_TO_SOURCE, PATH_TO_DIST, PATH_TO_RAW } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;
import sharp from 'gulp-sharp-responsive';
import { stacksvg } from 'gulp-stacksvg';
import svgo from 'gulp-svgmin';
import imagemin from 'gulp-imagemin';
import pngQuant from 'imagemin-pngquant';
import mozJpeg from 'imagemin-mozjpeg';

export function optimizeJpg() {
  return src(`${PATH_TO_DIST}/images/**/*.{jpg,jpeg}`)
    .pipe(imagemin([mozJpeg({quality: 90, progressive: true})]))
    .pipe(gulp.dest(`${PATH_TO_DIST}/images`));
}

export function optimizePng() {
  return src(`${PATH_TO_DIST}/images/**/*.png`)
    .pipe(
      imagemin([
        pngQuant({
          speed: 1,
          strip: true,
          dithering: 1,
          quality: [0.8, 0.9],
        })]))
    .pipe(gulp.dest(`${PATH_TO_DIST}/images`));
}
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

  return src(`${PATH_TO_RAW}images/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`${PATH_TO_SOURCE}images`));
}

export function optimizeVector() {
  return src([`${PATH_TO_SOURCE}images/**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_DIST));
}

export function sprite() {
  return src(`${PATH_TO_SOURCE}images/svg/**/*.svg`)
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(dest(`${PATH_TO_DIST}images`));
}
