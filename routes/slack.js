var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/one', function(req, res, next) {
    res.json(req.body)
});

module.exports = router;
