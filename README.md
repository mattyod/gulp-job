# [gulp](https://github.com/wearefractal/gulp)-job [![NPM version](http://img.shields.io/npm/v/gulp-job.svg)](https://www.npmjs.org/package/gulp-job) [![Build status](http://img.shields.io/travis/mattyod/gulp-job.svg)](http://travis-ci.org/mattyod/gulp-job)

> Wrap files in self invoking functions that bind them to an object. Possibly compiled Jade templates.

## Installation

```
npm install gulp-job
```

## Use case

Gulp job will wrap a file in a self invoking function that in turn binds the 'file' to a namespace on an object. The following describes the specific use case that lead to the creation of _gulp-job_.

Lets say you have a Jade template, something like:

```jade
p Hello world
```

And you want to compile this, load it in as a client side script and then access it in a way such as:

```js
window.templates.example([locals]);
```

Gulp-job can take a compiled template (my-example.js) such as:

```js
function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;

  buf.push("<p>Hello world</p>");
  return buf.join("");
}
```

and wrap it like so:

```js
(function (window) {
  window.templates = window.templates || {};
  window.templates.myExample = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;

    buf.push("<p>Hello world</p>");
    return buf.join("");
}})(window);
```

## Usage

```js
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    job = require('gulp-job');

gulp.task('job', function () {
  return gulp.src(['src/templates/*.jade'])
    .pipe(jade({ client: true }))
    .pipe(job())
    .pipe(gulp.dest('public/templates'));
});
```

This will compile your templates using gulp-jade and wrap them as shown above so that they can be included like normal js files.

### Options

Gulp-job accepts an options object with the following attributes

> #### parent _(string)_

**default:** _'window'_

The object to bind to.

> #### namespace _(string)_

**default:** _'templates'_

The namespace to bind to

> #### seperator _(string)_

**default:** _'-'_

The file name seperator. This will be used for converting file names to camel case object references.

i.e with the default settings the template file my-example.js would be accessible with:

```js
window.templates.myExample();
```

## It's a bit specific isn't it?

Yes it is, we had a very specific problem and we built a very specific solution to it. We also needed it to be part of our Gulp task flow.

Maybe someone else will have that very same specific problem one day; so here it is for all to use, fork, share, whatever.

## Licence

[MIT](https://raw.github.com/mattyod/gulp-job/master/LICENSE)
