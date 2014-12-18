'use strict';

var job = require('../index.js'),
    File = require('vinyl');

describe('gulp-job', sandbox(function () {

  describe('pre', function () {
    var buffer;

    beforeEach(function () {
      buffer = job.prototype.pre();
    });

    it('returns a buffer', function () {
      buffer.should.be.an.instanceof(Buffer);
    });

  });

  describe('post', function () {
    var buffer;

    beforeEach(function () {
      buffer = job.prototype.post();
    });

    it('returns a buffer', function () {
      buffer.should.be.an.instanceof(Buffer);
    });

  });

  describe('capitalise', function () {

    it('capitalises a word', function () {
      job.prototype.capitalise('foo').should.equal('Foo');
    });

  });

  describe('camel', function () {

    it('converts seperated words to camelcase', function () {
      job.prototype.camel('foo-bar-baz').should.equal('fooBarBaz');
    });

  });

  describe('getFileName', function () {

    it('returns a file name from a path', function () {
      job.prototype.getFileName('/foo/bar/myfile.js').should.equal('myfile');
    });

    it('strips and dots from the file name', function () {
      job.prototype.getFileName('/foo/bar/myfile.test.js').should.equal('myfiletest');
    });

  });

  describe('wrap', function () {
    var file;

    beforeEach(function () {
      sandbox.stub(job.prototype, 'pre').returns(new Buffer('foo'));
      sandbox.stub(job.prototype, 'post').returns(new Buffer('bar'));

      file = new File({
        path: '/test/file.js',
        contents: new Buffer('-middle-')
      });

      job.prototype.wrap(file);
    });

    it('wraps the file', function () {
      file.contents.toString().should.equal('foo-middle-bar');
    });

  });

  describe('funnel', function () {
    var callback,
        file = {};

    beforeEach(function () {
      callback = sandbox.stub();

      file.isNull = sandbox.stub().returns(false);
      file.isStream = sandbox.stub().returns(false);
      file.isBuffer = sandbox.stub().returns(true);
      job.prototype.push = sandbox.stub();
      job.prototype.wrap = sandbox.stub();
      job.prototype.funnel(file, 'utf8', callback);
    });

    it('checks if file isNull', function () {
      file.isNull.should.have.been.calledOnce;
    });

    it('checks if file isStream', function () {
      file.isStream.should.have.been.calledOnce;
    });

    it('checks if file isBuffer', function () {
      file.isStream.should.have.been.calledOnce;
    });

    it('wraps the file', function () {
      job.prototype.wrap.should.have.been.calledWithExactly(file);
    });

    it('pushes the file into scope', function () {
      job.prototype.push.should.have.been.calledWithExactly(file);
    });

    it('finishes up with the callback', function () {
      callback.should.have.been.calledOnce;
    });

  });

}));
