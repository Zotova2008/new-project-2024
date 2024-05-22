import { PATH_TO_SOURCE, PATH_TO_DIST, isDevelopment } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;
import plumber from 'gulp-plumber';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { createGulpEsbuild } from 'gulp-esbuild';

import webpackStream from 'webpack-stream';
import webpackConfig from './../webpack.config.js';

export function jsWebpack() {
  return src(`${PATH_TO_SOURCE}js/main.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(`${PATH_TO_DIST}js`));
}

export function js() {
  const gulpEsbuild = createGulpEsbuild({ incremental: isDevelopment });
  return src(`${PATH_TO_SOURCE}js/*.js`)
    .pipe(gulpEsbuild({
      bundle: true,
      format: 'esm',
      // splitting: true,
      platform: 'browser',
      minify: !isDevelopment,
      sourcemap: isDevelopment,
      target: browserslistToEsbuild(),
    }))
    .pipe(rename('main.min.js'))
    .pipe(dest(`${PATH_TO_DIST}js`));
}
