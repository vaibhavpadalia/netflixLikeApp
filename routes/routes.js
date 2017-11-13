var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');


router.route('/v1/createUser')
    .post(controller.createUser);

router.route('/v1/insertMovie')
    .post(controller.insertMovie);

router.route('/v1/insertSeries')
    .post(controller.insertSeries);

router.route('/v1/insertSeason')
    .post(controller.insertSeason);

router.route('/v1/insertEpisode')
    .post(controller.insertEpisode);

router.route('/v1/getAllMovies')
    .get(controller.getAllMovies);

router.route('/v1/getAllSeries')
    .get(controller.getAllSeries);

router.route('/v1/getAllSeasons/:name')
    .get(controller.getAllSeasons);

router.route('/v1/getAllEpisodes/:name/:number')
    .get(controller.getAllEpisodes);

router.route('/v1/getUser/:email/:password')
    .get(controller.getUser);

router.route('/v1/getMovie/:name')
    .get(controller.getMovie);

router.route('/v1/getSeries/:name')
    .get(controller.getSeries);

router.route('/v1/deleteMovie/:name')
    .delete(controller.deleteMovie);

router.route('/v1/deleteSeries/:name')
    .delete(controller.deleteSeries);

router.route('/v1/deleteSeason/:name')
    .delete(controller.deleteSeason);

router.route('/v1/deleteEpisode/:name')
    .delete(controller.deleteEpisode);

router.route('/v1/updateMovie/:id')
    .put(controller.updateMovie);

router.route('/v1/updateSeries/:id')
    .put(controller.updateSeries);

router.route('/v1/changePassword/:email/:password')
    .put(controller.changePassword);

module.exports = router;
