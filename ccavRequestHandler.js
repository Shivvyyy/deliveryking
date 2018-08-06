var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
	workingKey = 'B5105C7F4A443A7254E140214288B696',		//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVHB77FD34AS96BHSA',		//Put in the access code shared by CCAvenues.
	encRequest = '',
	formbody = '';

    request.on('data', function (data) {
        console.log("hitted");
	body += data;
	encRequest = ccav.encrypt(body,workingKey);
	POST =  qs.parse(body);
    merchantId = ccav.encrypt(POST.merchant_id,workingKey);
  console.log(POST);
	formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+merchantId+'&encRequest='+encRequest+'&access_code='+accessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    });

    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	response.end();
    });

   return;
};
