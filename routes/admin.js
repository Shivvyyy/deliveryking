var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');
var async = require('async');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/add-category', function(req, res, next) {
  // res.render('admin/add-category', { message: req.flash('success') });
  return res.json('saved');
});

router.get('/categories', function(req, res, next) {
  // res.render('admin/add-category', { message: req.flash('success') });
  Category
  .find({})
  .exec(function(err, categories) {
    if (err)
    {
      console.log('there is errror');
      return next(err);
    }

    return res.json(categories);
});

});


router.get('/product/:id', function(req, res, next) {
  Product.findById({ _id: req.params.id }, function(err, product) {
    if (err) return res.status(500).json({err});
    else
    {
      res.status(201).json({product});
    }

  });
});


router.post('/add-category', function(req, res, next) {
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err) {
    if (err)
    {
      return res.status(500).json({
        error:err
      });
    }
    else
    {
    // req.flash('success', 'Successfully added a category');
    return res.status(201).json('Category Saved');
   }
  });
});


//add product

router.post('/add-food',upload.single('prodImg'), function(req, res, next) {


  async.waterfall([
    function(callback) {
      Category
      .find({name: req.body.category })
      .select('_id')
      .exec(function(err, category) {
        if (err)
        {
          res.status(500).json({
            error: err
          });
        }
        else
        {
        callback(null,category[0]._id);
      }

      });
    },

    function(category, callback) {
      console.log(category);
      const product = new Product({
          name: req.body.name,
          category: category,
          prodDesc: req.body.prodDesc,
          prodImg: req.file.path,
          serve: req.body.serve,
          price: req.body.price,
          fullPrice: req.body.nonVegPrice,
          nonVeg: req.body.nonVeg,
          veg: req.body.veg,
          mainSection1: req.body.mainSection1,
          mainSection2: req.body.mainSection2
        });
        product
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Created product successfully",
              createdProduct: {
                name: result.name,
                _id: result._id,
                request: {
                  type: "GET",
                  url: "http://deliveryking123.herokuapp.com/product/" + result._id
                }
              }
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
    }
  ]);

});











module.exports = router;
