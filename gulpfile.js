/**
 * Module dependencies
 */

const del = require('del')
const gulp = require('gulp')
const cssnano = require('cssnano')
const mqpacker = require('css-mqpacker')
const autoprefixer = require('autoprefixer')
const gulpLoadPlugins = require('gulp-load-plugins')

const { name, version, homepage, author, license } = require('./package')

// loade all gulp plugins
const $ = gulpLoadPlugins()

// environment
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

// build comments
const comments = `/*!
 * ${name} v${version} (${homepage})
 * Copyright ${new Date().getFullYear()} ${author.name} <${author.email}> (${author.url})
 * Licensed under ${license}
 */`

/**
 * Private tasks
 */

const clean = () => {
  return del(['assets/dist'])
}

const style = () => {
  return gulp.src('assets/scss/*.scss')
    .pipe($.plumber())
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.sass({ outputStyle: 'expanded' }).on('error', $.sass.logError))
    .pipe($.if(isProduction, $.postcss([autoprefixer(), mqpacker(), cssnano()])))
    .pipe($.if(isProduction, $.header(comments)))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('assets/dist'))
    .pipe($.livereload())
}

const script = () => {
  return gulp.src('assets/js/*.js')
    .pipe($.plumber())
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.babel({ presets: ['@babel/env'] }))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.if(isProduction, $.header(comments)))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('assets/dist'))
    .pipe($.livereload())
}

const image = () => {
  return gulp.src('assets/img/**/*.*')
    .pipe($.plumber())
    .pipe($.if(isProduction, $.imagemin()))
    .pipe(gulp.dest('assets/dist'))
    .pipe($.livereload())
}

const archive = () => {
  const source = [
    'assets/dist/**',
    'locales/*.json',
    '**/*.hbs', '!node_modules/**',
    'LICENSE',
    'package.json',
    'README.md'
  ]

  return gulp.src(source, { base: '.' })
    .pipe($.plumber())
    // .pipe($.zip(`${name}-v${version}.zip`))
    .pipe($.zip(`${name}.zip`))
    .pipe(gulp.dest('.'))
}

const watch = () => {
  $.livereload.listen()
  gulp.watch('assets/scss/**', style)
  gulp.watch('assets/js/**', script)
  gulp.watch('assets/img/**/*.*', image)
  gulp.watch('**/*.hbs').on('change', p => $.livereload.changed(p))
}

const compile = gulp.parallel(style, script, image)

/**
 * Public tasks
 */

const build = gulp.series(clean, compile)

const release = gulp.series(build, archive)

const develop = gulp.series(build, watch)

module.exports = { build, release, develop }
