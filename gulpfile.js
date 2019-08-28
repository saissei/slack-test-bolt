/* eslint-disable */
'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const rimraf = require('rimraf')

const plumber = require('gulp-plumber')

const ts = require('gulp-typescript')
const tsc = ts.createProject('./tsconfig.json')

gulp.task('controller', () => {
  return gulp
    .src(['src/controller/**/*.ts'], {
      since: gulp.lastRun('controller'),
    })
    .pipe(plumber())
    .pipe(tsc())
    .pipe(gulp.dest('dist/controller'))
})

gulp.task('presenter', () => {
  return gulp
    .src(['src/presenter/**/*.ts'], {
      since: gulp.lastRun('presenter'),
    })
    .pipe(plumber())
    .pipe(tsc())
    .pipe(gulp.dest('dist/presenter'))
})

gulp.task('interactor', () => {
  return gulp
    .src(['src/interactor/**/*.ts'], {
      since: gulp.lastRun('interactor'),
    })
    .pipe(plumber())
    .pipe(tsc())
    .pipe(gulp.dest('dist/interactor'))
})

gulp.task('nodemon', callback => {
  let started = false
  return nodemon({
    script: 'dist/server/Server.js',
    watch: ['dist/**/*.js'],
    ext: 'js',
    stdout: true,
    delay: 500,
    env: {
      NODE_ENV: 'development',
    },
  })
    .on('start', () => {
      if (!started) {
        callback()
        started = true
      }
    })
    .on('restart', () => {
      console.log('SERVER RESTARTED')
    })
})

gulp.task('clean', callback => {
  rimraf('dist', callback)
})

gulp.task(
  'build',
  gulp.series('clean', 'controller', 'interactor', 'presenter', 'server')
)

gulp.task(
  'default',
  gulp.parallel('nodemon', callback => {
    gulp.watch('src/loan-command/**/*.ts', gulp.series('loan-command'))
    gulp.watch('src/controller/**/*.ts', gulp.series('loan-controller'))
    gulp.watch('src/interactor/**/*.ts', gulp.series('loan-interactor'))
    gulp.watch('src/presenter/**/*.ts', gulp.series('loan-presenter'))

    gulp.watch('src/server/**/*.ts', gulp.series('loan-server'))
    callback()
  })
)
