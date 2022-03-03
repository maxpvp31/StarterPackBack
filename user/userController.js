var express = require('express');
var router = express.Router();
var user = require('./user');
 
router.post('/', function (req, res) {
    user.get(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    });
});
 
router.post('/update', function (req, res) {
    user.update(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

router.post('/insert', function (req, res) {
    user.insert(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
 
router.post('/delete', function (req, res) {
    user.delete(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
 
module.exports = router;