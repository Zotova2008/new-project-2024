import { PATH_TO_SOURCE, PATH_TO_DIST, isDevelopment } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;
import autoprefixer from 'autoprefixer';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import csso from 'postcss-csso';
import postUrl from 'postcss-url';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);


export function css() {
  return src(`${PATH_TO_SOURCE}scss/styles.scss`, { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(dest(`${PATH_TO_DIST}css`, { sourcemaps: isDevelopment }));
}
