var router = require('express').Router();



//
router.get('/', function(req, res, next) {

    res.render('main/home');

});

router.get('/foods', function(req, res, next)
{
  res.render('main/food_description');
});


//export mainRoutes

module.exports = router;
