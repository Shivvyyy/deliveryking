var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');


//
router.get('/', function(req, res, next) {

    res.render('main/home');

});

// router.get('/foods', function(req, res, next)
// {
//   res.render('main/food_description');
// });

router.get('/food/:id', function(req, res, next) {
  Product.findById({ _id: req.params.id }).populate('category').exec(function(err, product) {
    if (err) return next(err);
    else
    {
      res.render('main/food_description',{
        product:product
      });
    }

});

});

router.get('/foodCart/:id', function(req, res, next) {
  Product.findById({ _id: req.params.id },function(err, product) {
    if (err) return next(err);
    else
    {
    res.status(201).json({
      product:product
    });
    }

});

});


//export mainRoutes

module.exports = router;
