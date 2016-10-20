var _ = require('lodash');


function className() {
    var styles = _.head(arguments);
    var args = _.tail(arguments);

    const classNames = _.map(args, function (arg) {
        if (_.isString(arg))
            return styles[arg];
        if (_.isArray(arg))
            return className.apply(this, _.concat(styles, arg));
        if (_.isObject(arg))
            return className.apply(this, _.concat(styles, _.keys(_.pickBy(arg))));
    });
    return classJoin(classNames);
}

function classJoin() {
    var classNames = [];
    _.forEach(arguments, function (arg) {
        if (_.isString(arg) && arg)
            classNames.push(arg);
        if (_.isArray(arg) && !_.isEmpty(arg))
            classNames.push(classJoin.apply(this, arg));
    });
    return classNames.join(' ');
}

module.exports = {
    className: className,
    classJoin: classJoin
};
