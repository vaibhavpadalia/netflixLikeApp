var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, trim: true},
    password: { type: String },
    role: { type: Number },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date }
});

var MovieSchema = new Schema({
    mid: { type: String, unique: true, required: true, trim: true },
    imgSrc: {type: String},
    name: { type: String, trim: true},
    releaseDate: { type: String },
    description: { type: String },
    genre: {type: String },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date }
});

var SeriesSchema = new Schema({
    sid: { type: String, unique: true, required: true },
    name: { type: String, unique: true, trim: true},
    imgSrc: { type: String },
    releaseDate: { type: String },
    description: { type: String },
    genre: { type: String },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date }
});

var SeasonSchema = new Schema({
    name: { type: String, trim: true},
    releaseDate: { type: String },
    description: { type: String },
    episodeList: { type: Number },
    imgSrc: { type: String},
    seasonNumber: { type: Number},
    genre: { type: String },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date }
});

var EpisodeSchema = new Schema({
    name: { type: String, trim: true },
    seasonNumber: { type: Number },
    episodeName: { type: String },
    imgSrc:{ type: String },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date }
});



var User = mongoose.model('userData', UserSchema);
var Series = mongoose.model('seriesData', SeriesSchema);
var Season = mongoose.model('movieData', MovieSchema);
var Movie = mongoose.model('seasonData', SeasonSchema);
var Episode = mongoose.model('episodeData',EpisodeSchema);

module.exports = {
    User:User,
    Series: Series,
    Season: Season,
    Movie: Movie,
    Episode: Episode
 }
