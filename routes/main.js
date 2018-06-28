var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');
var Order = require('../models/order');
var User       = require('../models/user');
var http = require('http');
var async = require('async');
var crypto = require('crypto');
// var nodemailer = require('nodemailer');


router.get('/', function(req, res, next) {
  Product.find({ mainSection1: true }, { mainSection2: true } ).select("name _id prod_short_desc price mainSection1 nonVeg").exec(function(err, products) {

    if (err) return next(err);
    else{
      console.log("shiy");
        res.render('main/home',{
          products:products,
            user : req.user
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




router.get('/food/:foodTitle', function(req, res, next) {
  const prodName = req.params.foodTitle.replace(/-/g, " ");
  console.log(prodName);
  Product.find({ name: prodName }).populate('category').limit(1).exec(function(err, product) {


  Product
    .find({ category: product[0].category._id , _id: { $ne: product[0]._id }} )
    .populate('category')
    .limit(3)
    .exec(function(err, products) {
      if (err) return next(err);
      else
      {
         console.log(product);
      res.render('main/food_description',{
        product,
        products,
        user : req.user
      });
      }

    });




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

router.get('/checkout',(req, res, next)=>
{
res.render('main/checkout',{
    user : req.user
});
});

router.get('/about',(req, res, next)=>
{
res.render('main/about',{
    user : req.user
});
});


router.get('/privacy-policy',(req, res, next)=>
{
  res.render('main/privacy-policy',{
      user : req.user
  });
});
router.get('/terms-and-conditions',(req, res, next)=>
{
  res.render('main/terms',{
      user : req.user
  });
});
router.get('/refund-policy',(req, res, next)=>
{
  res.render('main/refund-policy',{
      user : req.user
  });
});

router.put('/review/:productId',(req,res,next)=>{
  const id = req.params.productId;
  console.log("shivy hiteted");
  console.log(req.body);
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  console.log(updateOps);
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Your Review Matters To Us.",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});




//add order
router.post('/add-order', function(req, res, next) {
  var order = new Order();
  order.customer = req.body.customer;

  if(req.body.customerId!='null') order.customerId = req.body.customerId;
  order.total = req.body.total;
  order.items = req.body.items;
  order.paymentMethod = req.body.paymentMethod;
  order.addressDetails = req.body.addressDetails;
  order.customerContact = req.body.customerContact;
  order.customerEmail = req.body.customerEmail;
  order.date = req.body.date;
  order.time = req.body.time;
  order.successful = req.body.successful;

  order.save(function(err,result) {
    if (err)
    {
      return res.status(500).json({
        error:err
      });
    }
    else
    {
    // req.flash('success', 'Successfully added a category');
    http.get(`http://makemysms.in/api/sendsms.php?username=MOBIAPI&password=makemysms@123&sender=MOBSFT&mobile=${req.body.customerContact}&type=1&product=1&message=Your order has been successfully fulfiled. Order Id: ${result._id}`, (resp) => {
      var data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data));
        return res.status(201).json('Success');
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

   }
  });
});



router.post('/gateway-order', function(req, res, next) {
  var order = new Order();
  order.customer = req.body.customer;
  if(req.body.customerId !='null') order.customerId = req.body.customerId;
  order.total = req.body.total;
  order.items = req.body.items;
  order.paymentMethod = req.body.paymentMethod;
  order.addressDetails = req.body.addressDetails;
  order.customerContact = req.body.customerContact;
  order.customerEmail = req.body.customerEmail;
  order.date = req.body.date;
  order.time = req.body.time;
  order.successful = req.body.successful;
  order.save(function(err,result) {
    if (err)
    {
      return res.status(500).json({
        error:err
      });
    }
    else
    {
    res.status(201).json({order_id:result._id});
   }
  });
});


router.get('/allOrders', function(req, res, next) {

  Order.find({}).sort({date: -1}).exec(function(err, orders) {

    if (err) res.status(500).json({err:err});
    else{

      res.status(201).json({
      orders:orders
      });
    }

});

});


router.post('/forgo', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ 'local.email': req.body.email }, function(err, user) {
        if (!user) {
          console.log('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'smarty.shibyan@gmail.com',
          pass: 'kronos@321'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'smarty.shibyan@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    console.log(err);
    if (err) return next(err);
    res.redirect('/forgot');
  });
});







router.get('/account/addressBook', function(req, res, next) {


      res.render('user/addressBook',{
        user : req.user
      });

})


router.post('/account/addressBook', function(req, res, next) {

  const id = req.user._id;
  console.log("shivy hiteted");

  User.update({ _id: id },  { $push: {"addresses": {
          location: req.body.location,
          street: req.body.street,
          phone: req.body.phone,
          pickerName: req.body.pickerName
      }}})
    .exec()
    .then(result => {
    res.redirect('/account/addressBook');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

router.get('/account/orders', function(req, res, next) {
  Order.find({customerId:req.user._id}).populate('items._id').sort({date: 1}).exec(function(err, orders) {

    if (err) res.status(500).json({err:err});
    else{

      res.render('user/orders',{
        user : req.user,
        orders
      });



    }

});

})

router.get('/order/:orderId',(req,res,next)=>{
  const id = req.params.orderId;
  console.log("shivy hiteted");
  const updateOps = {};
    updateOps['successful'] = true;

  console.log(updateOps);
  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order Successfully Updated.",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



//export mainRoutes

module.exports = router;
