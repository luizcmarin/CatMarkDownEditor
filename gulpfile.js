/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: gulpfile.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Gulp configuration file for the project.
*
*/

'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var terser = require('gulp-terser');
var concat = require('gulp-concat');
var header = require('gulp-header');
var buffer = require('vinyl-buffer');
var pkg = require('./package.json');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

var banner = ['/**',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * Copyright <%= pkg.author %>',
    ' * @link https://github.com/luizcmarin/CatMarkDownEditor',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');


var css_files = [
    './node_modules/codemirror/lib/codemirror.css',
    './src/css/catmarkdowneditor.css',
    './node_modules/codemirror-spell-checker/src/css/spell-checker.css',
];

function lint() {
    return gulp.src('./src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scripts() {
    return browserify({entries: './src/js/catmarkdowneditor.js', standalone: 'CatMarkDownEditor'}).bundle()
        .pipe(source('catmarkdowneditor.min.js'))
        .pipe(buffer())
        .pipe(terser())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/'));
}

function styles() {
    return gulp.src(css_files)
        .pipe(concat('catmarkdowneditor.css'))
        .pipe(cleanCSS())
        .pipe(rename('catmarkdowneditor.min.css'))
        .pipe(buffer())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/'));
}

// Watch for file changes
function watch() {
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch(css_files, styles);
}

var build = gulp.parallel(gulp.series(lint, scripts), styles);

gulp.task('default', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('lint', lint);
