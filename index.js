/*
 Copyright (c) 2016 Alexander Larin.
 Licensed under the MIT License (MIT), see
 https://github.com/alexanderlarin/css-classname
*/

var _ = require('lodash');


function join() {
    var classNames = [];
    _.forEach(_.flatten(arguments), function (arg) {
        if (_.isString(arg) && arg)
            classNames.push(arg);
    });
    return classNames.join(' ');
}

function combine(args, handler, map) {
    const classNames = _.map(args, function (arg) {
        if (_.isString(arg))
            return map(arg);
        if (_.isArray(arg))
            return handler(arg);
        if (_.isObject(arg))
            return handler(_.keys(_.pickBy(arg)));
    });
    return join(classNames);
}

function className() {
    var styles = _.head(arguments);
    var args = _.tail(arguments);

    return combine(args,
        function (args) {
            return className.apply(this, _.concat(styles, args));
        }, function(arg) {
            return styles[arg];
        });
}

function classJoin() {
    return combine(arguments,
        function (args) {
            return classJoin.apply(this, args);
        },
        _.identity);
}

module.exports = {
    className: className,
    classJoin: classJoin
};
