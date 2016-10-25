var expect = require('chai').expect;

var classJoin = require('..').classJoin;


describe('classJoin', function () {
    it('empty params', function () {
        expect(classJoin()).to.be.equals('');
    });

    it('single string param', function () {
        expect(classJoin('container')).to.be.equals('container');

        expect(classJoin('')).to.be.equals('');
        expect(classJoin(undefined)).to.be.equals('');
        expect(classJoin(null)).to.be.equals('');
    });

    it('some string params with order', function () {
        expect(classJoin('container', 'item')).to.be.equals('container item');
        expect(classJoin('item', 'container')).to.be.equals('item container');
    });

    it('single object param with keys order', function () {
        expect(classJoin({ container: true, undefined: null })).to.be.equals('container');
        expect(classJoin({ container: true, item: true })).to.be.equals('container item');
        expect(classJoin({ item: true, container: true })).to.be.equals('item container');
    });

    it('single array param with order', function () {
        expect(classJoin(['container', undefined, null, ''])).to.be.equals('container');
        expect(classJoin(['container', 'item'])).to.be.equals('container item');
        expect(classJoin(['item', 'container'])).to.be.equals('item container');
    });

    it('string array object params with order', function () {
        expect(classJoin('container', 'border', ['item'], { content: true }))
            .to.be.equals('container border item content');
        expect(classJoin('container', ['item'], 'border',  { content: true }))
            .to.be.equals('container item border content');
        expect(classJoin('container', 'border', { content: true }, ['item']))
            .to.be.equals('container border content item');
    });

    it('skips non-string params', function () {
        expect(classJoin('container', 1, 2, ['item', 3])).to.be.equals('container item');
    });

    it('not skips objects in array params', function () {
        expect(classJoin([{ container: true }, { stranger: true }, { content: false }, 'item'])).to.be.equals('container stranger item');
    });
});