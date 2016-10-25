/*
 Copyright (c) 2016 Alexander Larin.
 Licensed under the MIT License (MIT), see
 https://github.com/alexanderlarin/css-classname
*/

function join() {
    var classNames = [];
    [].concat.apply([], arguments).forEach(function (arg) {
        if ((typeof arg === 'string') && arg)
            classNames.push(arg);
    });
    return classNames.join(' ');
}

function combine(args, handler, map) {
    const classNames = Array.prototype.map.call(args, function (arg) {
        if (!arg)
            return '';
        if (typeof arg === 'string')
            return map(arg);
        if (Array.isArray(arg))
            return handler(arg);
        if (typeof arg === 'object')
            return handler(Object.keys(arg).filter(function (key) { return arg[key]; }));
    });
    return join(classNames);
}

function classJoin() {
    return combine(arguments,
        function (args) {
            return classJoin.apply(this, args);
        },
        function (arg) {
            return arg;
        });
}

function className() {
    var styles = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    return combine(args,
        function (args) {
            return className.apply(this, [].concat(styles, args));
        }, function(arg) {
            return styles[arg];
        });
}

module.exports = {
    className: className,
    classJoin: classJoin
};
