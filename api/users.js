var Q = require('q');

module.exports = function (User) {
    return {
        /**
         *
         * @returns Q.promise
         */
        get: function () {
            var df = Q.defer();
            User.find()
                .exec(function (err, result) {
                    if (err) {
                        console.log('Error fetching users:', err);
                        df.reject(err);
                    } else {
                        df.resolve(result);
                    }
                });
            return df.promise;
        }
    };
};