
module.exports = function (mongoose) {
    return {
        User: require('./models/user')(mongoose)
    };
};