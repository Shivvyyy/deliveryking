var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');


//
router.get('/', function(req, res, next) {
  Product.find({ mainSection1: true }, { mainSection2: true } ).select("name _id prod_short_desc price mainSection1").exec(function(err, products) {
    if (err) return next(err);
    else
    {
        // console.log(products);
        res.render('main/home',{
          products:products
        });
      // res.json({
      //   products:products
      // });
    }

});


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

//live search
router.get('/search', function(req, res, next) {
  if (req.query.term) {
    var regex = new RegExp(req.query["term"], 'i');
    var query = Product.find({name: regex}).select('_id name').limit(13);

       // Execute query in a callback and return users list
   query.exec(function(err, foods) {
       if (!err) {
          // Method to construct the json result set
          res.status(200).json(foods);
       } else {
        res.status(500).json(err);
       }
    });
  }
});

router.get('/happy', function(req, res, next) {

});

router.get('/checkout',(req, res, next)=>
{
res.render('main/checkout');
});



router.get('/delete',function(req,res,next){

  Product.collection.remove({},function(err,out){
    if(err) res.json({err});
    else
    res.json({out});
  });
});

//export mainRoutes

module.exports = router;
