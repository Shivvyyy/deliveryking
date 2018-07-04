var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');
var async = require('async');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploaded_images/uploads/');
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

    return res.status(201).json(categories);
});

});



router.post('/add-category', function(req, res, next) {
  var category = new Category();
  category.name = req.body.name;
  category.desc = req.body.desc;

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
        return next(err);
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
          prodItemDesc: req.body.prodItemDesc,
          prodImg: req.file.filename,
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




// router.get('/', function(req, res, next) {
//
//   var categoryProducts = {};
//
//
// async.waterfall([
//
//
// function(callback)
// {
//   Category
//     .find()
//     .exec(function(err, categories) {
//       if (err)
//       {
//         console.log(err);
//       }
//       else
//       {
//         callback(null,categories);
//       }
//     });
//
// },
//
//
// function(categories,callback)
// {
//
// // async.forEach(categories,function(category,index){
// // // console.log(category._id);
// // Product
// //   .find({ category: category._id})
// //   .populate('category')
// //   .exec(function(err, products) {
// //     if (err)
// //     {
// //       // res.status(500).json({error:err});
// //       console.log('error happened');
// //     }
// //     else {
// //
// //       categoryProducts.category_name = products;
// //       // console.log(categoryProducts);
// //       console.log(category.name);
// //       console.log(index);
// //     }
// //
// //   });
// //
// // });
//
//
// async.eachSeries(categories, function (category, callback) {
//   console.log(category.name);
//   callback(); // Alternatively: callback(new Error());
// }, function (err) {
//   if (err) { throw err; }
//   callback(null,categoryProducts);
// });
//
//
// },
//
// function(categoryProducts, callback)
// {
//   console.log('Shivy here');
//   res.status(201).json({categoryProducts});
// }
//
//
// ]);
//
//
// });


router.get('/products/:id/:limit', function(req, res, next) {

  Product
    .find({ category: req.params.id })
    .populate('category')
    .limit(parseInt(req.params.limit))
    .exec(function(err, products) {
      if (err) return next(err);
      // res.render('main/category', {
      //   products: products
      // });
      res.status(201).json(products);
    });

});


router.get('/allProducts/:id/:skip', function(req, res, next) {
Product
  .find({ category: req.params.id })
  .skip(parseInt(req.params.skip))
  .populate('category')
  .exec(function(err, products) {
    if (err) return next(err);
    // res.render('main/category', {
    //   products: products
    // });
    res.status(201).json(products);
  });
});


router.delete('/deleteProduct/:id', function(req, res, next) {
Product
  .remove({ _id: req.params.id })
  .exec(function(err, products) {
    // res.render('main/category', {
    //   products: products
    // });
        if (err) return next(err);
    res.status(201).json('Product Deleted');
  })

});

router.delete('/deleteCategory/:id', function(req, res, next) {
Category
  .remove({ _id: req.params.id })
  .exec(function(err, categories) {
    // res.render('main/category', {
    //   products: products
    // });
        if (err) return next(err);
    res.status(201).json('Category Deleted');
  })
});



module.exports = router;
