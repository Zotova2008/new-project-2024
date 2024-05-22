import { readFileSync, rmSync } from 'node:fs';
import { PATH_TO_SOURCE, PATH_TO_DIST, PATH_TO_RAW, PATHS_TO_STATIC, isDevelopment } from './gulp/config.js';
import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import { html, lintBem } from './gulp/html.js';
import { css } from './gulp/styles.js';
import { jsWebpack, js } from './gulp/script.js';
import { optimizeRaster, optimizeVector, sprite, optimizeJpg, optimizePng } from './gulp/images.js';
import { copyAssets } from './gulp/copy.js';

import browserSync from 'browser-sync';
const server = browserSync.create();
const streamStyles = () => css().pipe(server.stream());

export function startServer() {
  server.init({
    server: {
      baseDir: PATH_TO_DIST
    },
    serveStatic: [
      {
        route: '/fonts',
        dir: `${PATH_TO_SOURCE}fonts`,
      },
      {
        route: '/*.ico',
        dir: `${PATH_TO_SOURCE}*.ico`,
      },
      // {
      //   route: '/*.webmanifest',
      //   dir: `${PATH_TO_SOURCE}*.webmanifest`,
      // },
      {
        route: '/favicons',
        dir: `${PATH_TO_SOURCE}favicons`,
      },
      {
        route: '/lib',
        dir: `${PATH_TO_SOURCE}lib`,
      },
      {
        route: '/images',
        dir: `${PATH_TO_SOURCE}images`,
      },
    ],
    cors: true,
    notify: false,
    ui: false,
  },
    (err, bs) => {
      // bs.addMiddleware('*', (req, res) => {
      //   res.write(readFileSync(`${PATH_TO_DIST}404.html`));
      //   res.end();
      // });
    });

  watch(`${PATH_TO_SOURCE}**/*.html`, series(html, refresh));
  watch(`${PATH_TO_SOURCE}scss/**/*.scss`, series(css, streamStyles));
  watch(`${PATH_TO_SOURCE}js/**/*.js`, series(js, refresh));
  watch(`${PATH_TO_SOURCE}images/sprite/**/*.svg`, series(sprite, refresh));
  watch(`${PATH_TO_SOURCE}images/svg/**/*.svg`, series(sprite, optimizeVector, refresh));
  watch(PATHS_TO_STATIC, series(copyAssets, refresh));
}


function refresh(done) {
  server.reload();
  done();
}

export function removeBuild(done) {
  rmSync(PATH_TO_DIST, {
    force: true,
    recursive: true,
  });
  done();
}

export function build(done) {
  isDevelopment = false;
  series(
    removeBuild,
    parallel(
      html,
      css,
      jsWebpack,
      sprite,
      copyAssets,
    ),
    optimizePng, optimizeJpg
  )(done);
}

export function start(done) {
  series(
    removeBuild,
    parallel(
      html,
      css,
      jsWebpack,
      sprite,
      copyAssets,
      optimizeVector,
    ),
    startServer,
  )(done);
}
