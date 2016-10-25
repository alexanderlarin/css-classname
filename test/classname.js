var expect = require('chai').expect;

var className = require('..').className;


describe('className', function () {
    var styles;

    beforeEach(function () {
        styles = {
            container: 'mock-container',
            item: 'mock-item',
            content: 'mock-content',
            border: 'mock-border'
        };
    });

    it('empty params', function () {
        expect(className(styles)).to.be.equals('');
    });

    it('single string param', function () {
        expect(className(styles, 'container')).to.be.equals('mock-container');

        expect(className(styles, '')).to.be.equals('');
        expect(className(styles, undefined)).to.be.equals('');
        expect(className(styles, null)).to.be.equals('');
        expect(className(styles, 'stranger')).to.be.equals('');
    });

    it('some string params with order', function () {
        expect(className(styles, 'container', 'item', 'stranger')).to.be.equals('mock-container mock-item');
        expect(className(styles, 'item', 'container', 'stranger')).to.be.equals('mock-item mock-container');
        expect(className(styles, 'stranger', 'container', 'item')).to.be.equals('mock-container mock-item');
        expect(className(styles, 'stranger', 'item', 'container')).to.be.equals('mock-item mock-container');
    });

    it('single object param with keys order', function () {
        expect(className(styles, { container: true, stranger: true, undefined: null })).to.be.equals('mock-container');
        expect(className(styles, { container: true, item: true, stranger: true })).to.be.equals('mock-container mock-item');
        expect(className(styles, { item: true, container: true, stranger: true })).to.be.equals('mock-item mock-container');
        expect(className(styles, { stranger: true, container: true, item: true })).to.be.equals('mock-container mock-item');
        expect(className(styles, { stranger: true, item: true, container: true })).to.be.equals('mock-item mock-container');
    });

    it('single array param with order', function () {
        expect(className(styles, ['container', 'stranger'])).to.be.equals('mock-container');
        expect(className(styles, ['container', 'stranger', undefined, null, ''])).to.be.equals('mock-container');
        expect(className(styles, ['container', 'item', 'stranger'])).to.be.equals('mock-container mock-item');
        expect(className(styles, ['item', 'container', 'stranger'])).to.be.equals('mock-item mock-container');
        expect(className(styles, ['stranger', 'container', 'item'])).to.be.equals('mock-container mock-item');
        expect(className(styles, ['stranger', 'item', 'container'])).to.be.equals('mock-item mock-container');
    });

    it('string array object params with order', function () {
        expect(className(styles, 'container', 'border', ['item'], { content: true }))
            .to.be.equals('mock-container mock-border mock-item mock-content');
        expect(className(styles, 'container', ['item'], 'border',  { content: true }))
            .to.be.equals('mock-container mock-item mock-border mock-content');
        expect(className(styles, 'container', 'border', { content: true }, ['item']))
            .to.be.equals('mock-container mock-border mock-content mock-item');
    });

    it('skips non-string params', function () {
        expect(className(styles, 'container', 1, 2, ['item', 3])).to.be.equals('mock-container mock-item');
    });

    it('not skips objects in array params', function () {
        expect(className(styles, [{ container: true }, { stranger: true }, { content: false }, 'item'])).to.be.equals('mock-container mock-item');
    });
});