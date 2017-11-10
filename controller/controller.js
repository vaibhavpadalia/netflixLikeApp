var mongoose = require('mongoose');
var User = mongoose.model('userData');
var Series = mongoose.model('seriesData');
var Season = mongoose.model('seasonData');
var Movie = mongoose.model('movieData');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Your Email@gmail.com',
        pass: 'your pass'
    }
});

exports.createUser = (req, res) => {
    console.log('Inside create user');
    let hash = bcrypt.hashSync(req.body.password, 10);
    var user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash,
        role: 1,
        created_at: new Date(),
        updated_at: ""
    });
    user.save((error, response) => {
        if (error) {
            res.json({
                success: false,
                body: error
            });
        }
        else {
            transporter.sendMail({from:'Your email@gmail.com',
                to: req.body.email,
                subject: 'Your Password',
                text: 'Thankyou for signing up with us. Your password is: ' + req.body.password}, 
                (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({
                success: true,
                body: response
            });
        }
    });
}


exports.insertMovie = (req,res) => {
    var movie = new Movie({
        mid: req.body.mid,
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        releaseDate: 1,
        genre: req.body.genre,
        description: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    movie.save((error, response) => {
        if (error) {
           return res.json({
                success: false,
                body: error
            });
        }
        return res.json({
            success: true,
            body: response
        });
    });
}   

exports.insertSeries = (req, res) => {
    console.log('Inside');
    var series = new Series({
        sid: req.body.sid,
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        releaseDate: 1,
        genre: req.body.genre,
        description: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    series.save((error, response) => {
        if (error) {
            return res.json({
                success: false,
                body: error
            });
        }
        return res.json({
            success: true,
            body: response
        });
    });
}   

exports.getAllMovies = (req, res) => {
    Movie.find({}, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.getAllSeries = (req, res) => {
    Series.find({}, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteMovie = (req,res) => {
    Movie.remove({name: req.params.name},(error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteSeries = (req, res) => {
    Series.remove({ name: req.params.name }, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteSeason = (req, res) => {
    Season.remove({ name: req.params.name }, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}


exports.getUser = (req, res) => {
    var email = req.params.email;
    User.findOne({ email: email }, (error, response) => {
        if (bcrypt.compareSync(req.params.password, response.password)) {
            return res.json(response);
        }
        else {
            return res.json(error);
        }
    });
}

exports.updateTotalCost = (req, res) => {
    console.log("In update");   // For testing purpose only
    var id = req.params.email;
    User.findOne({ email: id }, (error, data) => {
        if (error) {
            console.log("In error");
            res.json(error);
        }
        var price = req.body.price;
        data.totalCost = price;
        data.updated_at = new Date();
        data.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });

    });
}

exports.changePassword = (req, res) => {
    console.log('In change Password');
    let email = req.params.email;
    let password = req.params.password;
    console.log(email);
    User.findOne({ email: email }, (error, user) => {
        if (bcrypt.compareSync(req.params.password, user.password)) {
            console.log('passwords match');
            user.password = bcrypt.hashSync(req.body.newPassword, 10);
            user.updated_at = new Date();
            user.save((err, response) => {
                if (err) {
                    res.send(err);
                }
                res.json(response);
            });
        }
        else {
            return res.json(error);
        }
    });
}