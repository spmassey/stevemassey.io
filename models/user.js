
module.exports = function (mongoose) {
    var UserSchema = require('../schemas/user')(mongoose);
    return mongoose.model('Users', UserSchema);
};
