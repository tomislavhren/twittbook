var User = require('../app/models/user');

module.exports = function (apiRoutes, jwt, formidable) {

    apiRoutes.post('/login', function (req, res) {

        // find the user
        console.log(req.body.email)
        User.findOne({ 'local.email': req.body.email }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'User not found.' });
            } else if (user) {

                // check if password matches
                if (!user.validPassword(req.body.password)) {
                    res.status(401).json({ success: false, message: 'Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, 'slatkaTajna12');

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Hren stiže token :D',
                        token: token,
                        user: user
                    });
                }

            }

        });
    });

    apiRoutes.post('/register', function (req, res) {

        // find the user
        console.log(req.body.email)
        User.findOne({ 'local.email': req.body.email }, function (err, user) {

            if (err) throw err;

            if (user) {
                res.status(401).json({ success: false, message: 'That email is already taken.' });
            } else if (!req.body.password) {
                res.status(401).json({ success: false, message: 'No password' });

            } else {

                var newUser = new User();

                // set the user's local credentials
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);

                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    var token = jwt.sign(newUser, 'slatkaTajna12');


                    res.json({
                        success: true,
                        message: 'Hren stiže token :D',
                        token: token,
                        user: newUser
                    });
                });

            }
        });
    });

    apiRoutes.use(function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, 'slatkaTajna12', function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    apiRoutes.get('/', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    apiRoutes.post('/add-FB-account', function (req, res) {

        console.log(req.body.email)
        User.findOne({ 'local.email': req.body.email }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'User not found.' });
            } else if (!req.body.facebook_data) {
                res.status(401).json({ success: false, message: 'No facebook data.' });
            } else if (user) {
                console.log(JSON.parse(req.body.facebook_data));

                user.facebook = JSON.parse(req.body.facebook_data)
                user.facebook.lastTokenUpdate = new Date();

                user.save(function (err) {
                    if (err)
                        throw err;

                    res.json({
                        success: true,
                        message: 'User updated',
                        user: user
                    });
                });
            }
        });
    });

    apiRoutes.post('/update-password', function (req, res) {

        console.log(req.body.email)
        User.findOne({ 'local.email': req.body.email }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'User not found.' });
            } else if (!req.body.password) {
                res.status(401).json({ success: false, message: 'No password data.' });
            } else if (user) {
                console.log(JSON.parse(req.body.password));

                user.local.password = user.generateHash(req.body.password)

                user.save(function (err) {
                    if (err)
                        throw err;

                    res.json({
                        success: true,
                        message: 'User updated',
                        user: user
                    });
                });
            }
        });
    });

    apiRoutes.post('/add-twitter-account', function (req, res) {

        console.log(req.body.email)
        User.findOne({ 'local.email': req.body.email }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'User not found.' });
            } else if (!req.body.twitter_data) {
                res.status(401).json({ success: false, message: 'No twitter data.' });
            } else if (user) {
                console.log(JSON.parse(req.body.twitter_data));

                user.twitter = JSON.parse(req.body.twitter_data)
                user.twitter.lastTokenUpdate = new Date();
                
                user.save(function (err) {
                    if (err)
                        throw err;

                    res.json({
                        success: true,
                        message: 'User updated',
                        user: user
                    });
                });
            }
        });
    });
}