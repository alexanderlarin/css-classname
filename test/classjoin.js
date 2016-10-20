var expect = require('chai').expect;

var classJoin = require('..').classJoin;


describe('classJoin', function () {

    it('single string param', function () {
        expect(classJoin('container')).to.be.equals('container');

        expect(classJoin(undefined)).to.be.equals('');
        expect(classJoin(null)).to.be.equals('');
        expect(classJoin('')).to.be.equals('');
        expect(classJoin()).to.be.equals('');
    });

    it('multiple string params', function () {
        expect(classJoin('container', 'content')).to.be.equals('container content');
        expect(classJoin('container', undefined, null, '', 'content')).to.be.equals('container content');
    });

    it('single string array param', function () {
        expect(classJoin(['container', 'content', undefined, null, '', 'ooh'])).to.be.equals('container content ooh');
    });

    it('multiple string array params', function () {
        expect(classJoin(['container', null, 'content'], ['offside', ''])).to.be.equals('container content offside');
    });

    it('string and string array params', function () {
        expect(classJoin(['container'], 'content', undefined, ['offside', 'ooh'])).to.be.equals('container content offside ooh');
    });

    it('skip object and numbers params', function () {
        expect(classJoin(['container', 4, { property1: true }], {
            property2: false, property3: true }, 0, 1, 2., 'content' )).to.be.equals('container content');
    });
});