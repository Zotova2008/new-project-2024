import { PATH_TO_SOURCE, PATH_TO_DIST, PATHS_TO_STATIC } from './config.js';
import gulp from 'gulp';
const { src, dest } = gulp;

export function copyAssets() {
  return src(PATHS_TO_STATIC, { base: PATH_TO_SOURCE })
    .pipe(dest(PATH_TO_DIST));
}
