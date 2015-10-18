var Q = require('q'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function (User) {
    return {
        /**
         *
         * @param data
         * @returns Q.promise
         */
        add: function (data) {
            var df = Q.defer(),
                user = new User(data);
            if (user.password.length > 0) {
                user.password = bcrypt.hashSync(user.password);
            }
            user.save(function (err) {
                if (err) {
                    console.log('Error saving user:', err);
                    df.reject(err);
                } else {
                    console.log('Successfully added new user', user);
                    df.resolve(user);
                }
            });
            return df.promise;
        },
        /**
         *
         * @param id
         * @returns Q.promise
         */
        remove: function (id) {
            var df = Q.defer();
            User.remove({_id: id}, function (err) {
                if (err) {
                    console.log('Error removing user:', err);
                    df.reject(err);
                } else {
                    console.log('Successfully deleted user', id);
                    df.resolve(id);
                }
            });
            return df.promise;
        },
        /**
         *
         * @param id
         * @returns Q.promise
         */
        save: function (id, data) {
            var df = Q.defer();
            User.findById(id, function (err, user) {
                if (err) {
                    console.log('Error finding user:', err);
                    df.reject(err);
                } else {
                    for (var p in data) {
                        if (data.hasOwnProperty(p) && p.indexOf('_id') == -1) {
                            user[p] = data[p];
                        }
                    }
                    user.save(function (err) {
                        if (err) {
                            console.log('Error saving user:', err);
                            df.reject(err);
                        } else {
                            console.log('Successfully saved user', id);
                            df.resolve(id);
                        }
                    });
                }
            });
            return df.promise;
        },
    };
};