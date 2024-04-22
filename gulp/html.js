import { PATH_TO_SOURCE, PATH_TO_DIST, isDevelopment } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;
import fileInclude from 'gulp-file-include';
import htmlBeautify from 'gulp-html-beautify';
import bemlinter from 'gulp-html-bemlinter';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';

// Корректировка путей до файлов в разных вложенностях https://www.youtube.com/watch?v=jU88mLuLWlk&list=PLM6XATa8CAG5r23rupAHv2g9cq-NUv_Ux&index=2
// В тему pug https://www.youtube.com/watch?v=GwM5VsReYGw
export function html() {
  return src([`${PATH_TO_SOURCE}**/*.html`, `!${PATH_TO_SOURCE}**/_*.html`])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(htmlBeautify({ indentSize: 2, }))
    .pipe(htmlmin({ collapseWhitespace: !isDevelopment }))
    .pipe(dest(PATH_TO_DIST));
}

export function lintBem() {
  return src(`${PATH_TO_SOURCE}*.html`)
    .pipe(bemlinter());
}
