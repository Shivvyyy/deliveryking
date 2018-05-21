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
  console.log(POST);
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+POST.merchant_id+'&encRequest='+encRequest+'&access_code='+accessCode+'"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	response.end();
    });
   return;
};
