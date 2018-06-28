var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postRes = function(request,response){
    var ccavEncResponse='',
	ccavResponse='',
	workingKey = 'B5105C7F4A443A7254E140214288B696',	//Put in the 32-Bit key provided by CCAvenues.
	ccavPOST = '';

        request.on('data', function (data) {
	    ccavEncResponse += data;
	    ccavPOST =  qs.parse(ccavEncResponse);
	    var encryption = ccavPOST.encResp;
	    ccavResponse = ccav.decrypt(encryption,workingKey);
        });

	request.on('end', function () {
    const table = ccavResponse.split("=").join(',').split('&').join(',').split(','); //[["key","value"],["key","value"]]
       console.log(table);
     var orderId = (table.indexOf("order_id"))+1;
     console.log(orderId);
        orderId = table[orderId];
        var mobileNo = (table.indexOf("billing_tel"))+1;
        console.log(mobileNo);
        mobileNo =table[mobileNo];
        var orderStatus =  (table.indexOf("order_status"))+1;
        orderStatus =table[orderStatus];
        console.log(mobileNo);
        console.log(orderId);

        if(orderStatus!=='Failure')
        {

   http.get(`http://makemysms.in/api/sendsms.php?username=MOBIAPI&password=makemysms@123&sender=MOBSFT&mobile=${mobileNo}&type=1&product=1&message=Your order has been successfully fulfiled. Order Id: ${orderId}`, (resp) => {
     var data = '';

     // A chunk of data has been recieved.
     resp.on('data', (chunk) => {
       data += chunk;
     });

     // The whole response has been received. Print out the result.
     resp.on('end', () => {
       console.log(JSON.parse(data));
       console.log(orderId);
       console.log("shivyan");
       http.get(`http://deliverykings.co.in/order/${orderId}`, function(res) {
  console.log("Got response: " + res.statusCode);
    response.redirect('/?success=true');
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

     });

   }).on("error", (err) => {
     console.log("Error: " + err.message);
   });

   }
   else
   {
   response.redirect('/?success=false');
   }
            // response.writeHeader(200, {"Content-Type": "text/html"});

	    // response.end();
	});
};
