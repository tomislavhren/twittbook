var User = require('../app/models/user');
var facebookApi = require('../app/facebook.js');

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
                        token: token
                    });
                }

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

    apiRoutes.post('/add-FB', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    apiRoutes.post('/post-to-feed', function (req, res) {

        var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
        form.uploadDir = "./img";       //set upload directory
        form.keepExtensions = true;     //keep file extension

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            //TESTING
            // console.log("file size: " + JSON.stringify(files.fileUploaded.size));
            // console.log("file path: " + JSON.stringify(files.fileUploaded.path));
            // console.log("file name: " + JSON.stringify(files.fileUploaded.name));
            // console.log("file type: " + JSON.stringify(files.fileUploaded.type));
            // console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));

            //Formidable changes the name of the uploaded file
            //Rename the file to its original name
            // fs.rename(files.fileUploaded.path, './img/' + files.fileUploaded.name, function (err) {
            //     if (err)
            //         throw err;
            //     console.log('renamed complete');
            // });

            User.findOne({ 'local.email': fields.email }, function (err, user) {
                //console.log(user);
                if (err) throw err;

                if (user) {

                    if (user && user.facebook.token) {
                        if (!req.body.hasOwnProperty('message')) {
                            //  res.send('Error 400: Post syntax incorrect.');
                        }
                        facebookApi.postToFacebook(fields.message, user.facebook.token)
                        //  res.json({ message: 'Published to facebook' })
                    }
                    else {
                        console.log('User does\'t have facebook account');
                        // res.json({ message: 'User does\'t have facebook account' })
                    }
                }
            })
            res.end();

        });
    })
};