var mongoose = require('mongoose');
var User = mongoose.model('userData');
var Series = mongoose.model('seriesData');
var Season = mongoose.model('seasonData');
var Movie = mongoose.model('movieData');
var Episode = mongoose.model('episodeData');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vaibhavpadalia1996@gmail.com',
        pass: 'P@$sw0rdanon'
    }
});

exports.createUser = (req, res) => {
    console.log('Inside create user');  // For testing purpose only
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
            transporter.sendMail({from:'vaibhavpadalia1996@gmail.com',
                to: req.body.email,
                subject: 'Your Password.',
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
                // body: response
            });
        }
    });
}


exports.insertMovie = (req,res) => {
    var movie = new Movie({
        mid: req.body.mid,
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        releaseDate: req.body.releaseDate,
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
            // body: response
        });
    });
}   

exports.insertSeries = (req, res) => {
    console.log('Inside');
    console.log(req.body.releaseDate);
    var series = new Series({
        sid: req.body.sid,
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        releaseDate: req.body.releaseDate,
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
            // body: response
        });
    });
}

exports.insertSeason = (req, res) => {
    console.log('Inside Season');
    console.log(req.body.releaseDate);
    var season = new Season({
        sid: req.body.sid,
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        releaseDate: req.body.releaseDate,
        seasonNumber: req.body.seasonNumber,
        genre: req.body.genre,
        description: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    season.save((error, response) => {
        if (error) {
            return res.json({
                success: false,
                body: error
            });
        }
        return res.json({
            success: true,
            // body: response
        });
    });
}

exports.insertEpisode = (req, res) => {
    var episode = new Episode({
        name: req.body.name,
        episodeName: req.body.episodeName,
        imgSrc: req.body.imgSrc,
        seasonNumber: req.body.seasonNumber,
        created_at: new Date(),
        updated_at: ""
    });
    episode.save((error, response) => {
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

exports.getAllSeasons = (req, res) => {
    Season.find({name: req.params.name}, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.getAllEpisodes = (req, res) => {
    console.log('Inside get episodes');
    Episode.find({name: req.params.name, seasonNumber:req.params.number}, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteMovie = (req,res) => {
    console.log(req.params.name);
    Movie.remove({name: req.params.name},(error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        console.log(res.json(response));
    });
}

exports.deleteSeries = (req, res) => {
    console.log('del ser');
    Series.remove({ name: req.params.name }, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteSeason = (req, res) => {
    console.log('del season');
    Season.remove({ name: req.params.name }, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}

exports.deleteEpisode = (req, res) => {
    console.log('del episode');
    Episode.remove({ name: req.params.name }, (error, response) => {
        if (error) {
            return res.json(req, res, error);
        }
        res.json(response);
    });
}


exports.getUser = (req, res) => {
    var email = req.params.email;
    User.findOne({ email: email }, (error, response) => {
        if(response !== null) {
        if (bcrypt.compareSync(req.params.password, response.password)) {
            return res.json({
                email: response.email,
                role: response.role
            });
        }
    }
        return res.json(error);
    });
}

exports.getMovie = (req, res) => {
    var name = req.params.name;
    Movie.findOne({ name: name }, (error, response) => {
        if (error) {
            return res.json(error);
            }
        return res.json(response);
    });
}

exports.getSeries = (req, res) => {
    console.log('In series');
    var name = req.params.name;
    Series.findOne({ name: name }, (error, response) => {
        if (error) {
            return res.json(error);
        }
        return res.json(response);
    });
}

exports.updateMovie = (req, res) => {
    console.log("In update of movie");   // For testing purpose only
    var id = req.params.id;
    Movie.findOne({ mid: id }, (error, data) => {
        if (error) {
            console.log("In error");
            res.json(error);
        }
        var name = req.body.name;
        var imgSrc = req.body.imgSrc;
        var releaseDate = req.body.releaseDate;
        var genre = req.body.genre;
        var description = req.body.description;
        data.name = name;
        data.imgSrc = imgSrc;
        data.releaseDate = releaseDate;
        data.genre = genre;
        data.description = description;
        data.updated_at = new Date();
        data.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true
            });
        });

    });
}

exports.updateSeries = (req, res) => {
    console.log("In update of series");   // For testing purpose only
    var id = req.params.id;
    Series.findOne({ sid: id }, (error, data) => {
        if (error) {
            console.log("In error");
            res.json(error);
        }
        var name = req.body.name;
        var imgSrc = req.body.imgSrc;
        var releaseDate = req.body.releaseDate;
        var genre = req.body.genre;
        var description = req.body.description;
        data.name = name;
        data.imgSrc = imgSrc;
        data.releaseDate = releaseDate;
        data.genre = genre;
        data.description = description;
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