document.addEventListener("DOMContentLoaded", function(event) {

  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  var htmlText =  document.querySelector('.cartOrders');


  if(sessionCart!==null)
  {
      if(document.querySelector(".cart_order_place")!==null)
    document.querySelector(".cart_order_place").style.display="block";
      htmlText.innerHTML = '';
    var cart_quantity = 0;
  sessionCart.items.forEach(function(product,index){

    var cartOrder = '';
   cartOrder += '<div class="cart_order">';
   cartOrder += '<div class="cart_order_title"><span>';
   if(product.nonVeg)
{
     cartOrder +=   '<img src="../img/non-veg-icon.png" class="food_icon_cart">';
   }
  else
  {
     cartOrder +=   '<img src="../img/veg-icon.png" class="food_icon_cart">';
  }
      cartOrder += '&nbsp;'+product.name+'</div>';
        var productId = "'"+product._id+"'";
     cartOrder += '<div class="cart_order_close" onclick="removeItem('+productId+',this)">';
     cartOrder +=  '<i class="fa fa-times"></i>';
      cartOrder += '</div>';
      cartOrder += '<div class="cart_order_quantity">';
       cartOrder += '<div id="input_div">';
       cartOrder +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
       cartOrder += '<input type="text" data-val="'+product.price+'" value="'+product.quantity+'" id="'+product._id+'" disabled>';
       cartOrder += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
       cartOrder += '</div>';
       cartOrder += '</div>';

      cartOrder += '<div class="cart_order_price">';
       cartOrder += 'Rs <span>'+product.price * product.quantity+'</span>';
       cartOrder += '</div>';

     cartOrder += '</div>';

     cart_quantity += product.quantity
          htmlText.innerHTML += cartOrder;


  });
  document.querySelector(".cart_quan").innerText = cart_quantity;
      document.querySelector(".cartOrders").style.display = "block";
}




});



//side push



/* Set the width of the side navigation to 25% and the left margin of the page content to 25% */
function openNav(product,el,event) {
  // alert("shivy");
  // alert(product);
  el.removeAttribute("onclick");
  console.log('el =' + el);


console.log(product,el, "something");

// el.preventDefault();

    var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 201) {

     var product = JSON.parse(this.response);

      console.log(product);

if(document.getElementById('new'+product.product._id)!=null) document.getElementById('new'+product.product._id).remove();
     var htmlText =  document.querySelector('.cartOrders');
     var cartOrder = '';
    cartOrder += '<div class="cart_order">';
    cartOrder += '<div class="cart_order_title"><span>';
    if(product.product.nonVeg)
      cartOrder +=   '<img src="../img/non-veg-icon.png" class="food_icon_cart">';
    else
      cartOrder +=   '<img src="../img/veg-icon.png" class="food_icon_cart">';
       cartOrder += '&nbsp;'+product.product.name+'</div>';
         var productId = "'"+product.product._id+"'";
      cartOrder += '<div class="cart_order_close" onclick="removeItem('+productId+',this)">';
      cartOrder +=  '<i class="fa fa-times"></i>';
       cartOrder += '</div>';
       cartOrder += '<div class="cart_order_quantity">';
        cartOrder += '<div id="input_div">';
        cartOrder +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
        cartOrder += '<input type="text" data-val="'+product.product.price+'" value="1" id="'+product.product._id+'" disabled>';
        cartOrder += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
        cartOrder += '</div>';
        cartOrder += '</div>';

       cartOrder += '<div class="cart_order_price">';
        cartOrder += 'Rs <span>'+product.product.price +'</span>';
        cartOrder += '</div>';

      cartOrder += '</div>';



           sessionCart = JSON.parse(sessionStorage.getItem("cart"));

          // console.log(product.product.quanity, "cart");

        if(sessionCart === null)
        {
            if(document.querySelector(".cart_order_place")!==null)
          document.querySelector(".cart_order_place").style.display="block";

          // var oldhtmlText = htmlText.innerHTML;
          for(var i = 0; i < htmlText.length; i++)
              htmlText.removeChild(children[i]);

          htmlText.innerHTML = cartOrder;



          // htmlText.innerHTML += oldhtmlText;

          var cart = {};
          var cartItems =[];
          var item = {};
          item._id = product.product._id;
          item.quantity = 1;
          item.price = product.product.price;
          item.name = product.product.name;
          item.nonVeg = product.product.nonVeg;
          cartItems.push(item);
          cart.total = 0;
          cart.items = cartItems;

          sessionStorage.setItem("cart",JSON.stringify(cart));
          // alert("yes")
          console.log(sessionStorage.cart, "log");

          var sessionCartObj = JSON.parse(sessionStorage.cart);


            var subTotal = 0;
        sessionCartObj.items.forEach(function(productCart,index){
          subTotal += productCart.price*productCart.quantity;
        });


          if(document.querySelector(".cart_order_place")!==null)
           document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';

           var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        let randProds = JSON.parse(this.response);
        let htmlText2 = document.querySelector('.anythingdiv');

        htmlText2.innerHTML +=
        `<div class="anythingelse">
          Anything Else
        </div>`;

       randProds.forEach(function(product,index){
         console.log(product);
         htmlText2.innerHTML += `
         <div class="anythingcard" id="new${product._id}">
           <div class="anythingimage">
             <img src="http://deliverykings.co.in/uploads/${product.prodImg}" alt="" />
           </div>
           <div class="anythingprod">
             <div class="anythingtitle">${product.name}</div>
             <div class="anythingdesc">
         <div class="anythingprice">Rs ${product.price}</div>
         <div class="anythingorder" onclick="addIt('${product._id}',this,'${product.name}','${product.price}','${product.prodImg}','${product.nonVeg}')">ORDER</div>
             </div>
           </div>


         </div>`;

       });

       // htmlText.innerHTML += '</div>';

     }
 };
 xhttp.open("GET", "/random", true);
 xhttp.send();

        }


        else
        {
          // alert("Shivy");

                    var oldhtmlText = htmlText.innerHTML;
                    for(var i = 0; i < htmlText.length; i++)
                        htmlText.removeChild(children[i]);

                    htmlText.innerHTML = cartOrder;
                    htmlText.innerHTML += oldhtmlText;

          var item = {};
          item._id = product.product._id;
          item.quantity = 1;
          item.price = product.product.price;
          item.name = product.product.name;
          item.nonVeg = product.product.nonVeg;
          console.log(sessionCart);
          sessionCart.items.push(item);

          sessionStorage.setItem("cart",JSON.stringify(sessionCart));
        //   var subTotal = 0;
        // sessionCart.items.forEach(function(productCart,index){
        //   document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';
        // });
        }

        var sessionCart =  JSON.parse(sessionStorage.getItem("cart"));

        console.log(sessionCart, "hello tets");


  var subTotal = 0;
        sessionCart.items.forEach(function(productCart,index){
          subTotal += productCart.price*productCart.quantity;
          if(document.querySelector(".cart_order_place")!==null)
          document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';
        });


  //
  //     owner: { type: Schema.Types.ObjectId, ref: 'User'},
  // total: { type: Number, default: 0},
  // items: [{
  //   item: { type: Schema.Types.ObjectId, ref: 'Product'},
  //   quantity: { type: Number, default: 1},
  //   price: { type: Number, default: 0},
  // }]

  //change order search_button
  var shivyMove = el.parentElement;
  el.remove();
  var quantityBtn = '';
    quantityBtn += '<div id="input_div" class="shivy_move">';
    var input_shivy = product.product._id+'shivy';
    quantityBtn +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
    quantityBtn += '<input type="text" value="1" id="'+input_shivy+'" disabled>';
    quantityBtn += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
    quantityBtn += '</div>';
    shivyMove.innerHTML += quantityBtn;
   }

 };
 xhttp.open("GET", "/foodCart/"+product, true);
 xhttp.send();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
{
  document.getElementById("mySidenav").style.width = "100%";
     document.getElementById("mySidenav").style.paddingLeft = "5%";
     document.getElementById("mySidenav").style.paddingRight = "5%";
     // document.getElementById("wholeBody").style.marginRight = "300px";
     document.querySelector(".cartOrders").style.display = "block";
}
else
{
  document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("mySidenav").style.paddingLeft = "2%";
    document.getElementById("mySidenav").style.paddingRight = "2%";
    document.getElementById("wholeBody").style.marginRight = "300px";
    document.querySelector(".cartOrders").style.display = "block";
  }
    // document.getElementById("main").classList.remove("home_main");
    document.querySelector(".cart_quan").innerText = parseInt(document.querySelector(".cart_quan").innerText) + 1;










}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {

   document.getElementById("mySidenav").style.paddingLeft = "0px";
   document.getElementById("mySidenav").style.paddingRight = "0px";
    document.getElementById("mySidenav").style.width = "0px";
    // document.getElementById("main").classList.add("home_main");
    document.getElementById("wholeBody").style.marginRight = "0px";
}


//cart quanity

    var count = 1;

    function plus(id,val){

        var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
        sessionCart.items.some(function(product,index){
          console.log(product._id);
          if(product._id==id)
          {
            // alert("ejr");
          count = sessionCart.items[index].quantity;
          console.log(sessionCart.items[index]);
          sessionCart.items[index].quantity++;
          sessionStorage.setItem("cart",JSON.stringify(sessionCart));

                  // countEm.value = count;
         var subTotal = 0;

         console.log(sessionCart, "add session");
        sessionCart.items.forEach(function(productCart,index){
          subTotal += productCart.price*productCart.quantity;
            if(document.querySelector(".cart_order_place")!==null)
          document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';
        });
          return true;
          // alert(id);
        }
      });
        var countEl = document.getElementById(id);
        if(document.getElementById(id+'shivy')!==null) var countEm = document.getElementById(id+'shivy');
        else var countEm = false;
        // console.log(id);
        // console.log(countEl);
        // console.log(countEm);
        count++;
        if(countEl)
        {
        countEl.value = count;
        countEl.setAttribute("value",count);
        console.log(count);
        // console.log(  countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0]);
        countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText =  countEl.getAttribute("data-val")*count;

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("mySidenav").style.paddingLeft = "5%";
        document.getElementById("mySidenav").style.paddingRight = "5%";
        // document.getElementById("wholeBody").style.marginRight = "300px";
      }
      else
      {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("mySidenav").style.paddingLeft = "2%";
        document.getElementById("mySidenav").style.paddingRight = "2%";
        document.getElementById("wholeBody").style.marginRight = "300px";
      }
        document.querySelector(".cart_quan").innerText = parseInt(document.querySelector(".cart_quan").innerText) + 1;
      }
      else
      {
        val.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText = document.getElementById(id+'shivy').getAttribute("data-val")*count;
        var subT = parseInt(document.getElementById(id+'shivy').getAttribute("data-val")) + parseInt(document.querySelector('.itemPriceP').getElementsByTagName("span")[0].innerText);
        document.querySelector('.itemPriceP').getElementsByTagName("span")[0].innerText = subT;
        var gsT =  (subT*5)/100;
        document.querySelector('.gstP').getElementsByTagName("span")[0].innerText = gsT;
        document.querySelector('.gTotalP').getElementsByTagName("span")[0].innerText = gsT+subT;
      }

      if(countEm) countEm.value = count;
        // document.getElementById("main").classList.remove("home_main");
    }
    function minus(id,val){
      console.log(count);
      var test = false;
      var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
      sessionCart.items.some(function(product,index){
        console.log(product._id);
        if(product._id==id&&product.quantity>1)
        {
          test = true;
          var subTotal = 0;
          sessionCart.items.forEach(function(productCart,index){
            subTotal += productCart.price*productCart.quantity;
          });
          subTotal -= sessionCart.items[index].price;
            if(document.querySelector(".cart_order_place")!==null)
          document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';
        // alert(id);
        if (product._id==id&&product.quantity>1) {
           count = sessionCart.items[index].quantity;
          console.log(sessionCart.items[index]);
          sessionCart.items[index].quantity--;
           // console.log(count);
          sessionStorage.setItem("cart",JSON.stringify(sessionCart));
          return true;
        }

        // document.getElementById("main").classList.remove("home_main");

      }
    });


      if (test) {
        var countEl = document.getElementById(id);
        if(document.getElementById(id+'shivy')!==null)
        {
        var countEm = document.getElementById(id+'shivy');
      }
      else var countEm = false;
        count--;
        if(countEl)
        {
        countEl.value = count;
        countEl.setAttribute("value",count);
        countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText =  countEl.getAttribute("data-val")*count;

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        {

                document.getElementById("mySidenav").style.width = "100%";
                document.getElementById("mySidenav").style.paddingLeft = "5%";
                document.getElementById("mySidenav").style.paddingRight = "5%";
              // document.getElementById("wholeBody").style.marginRight = "300px";
            }

            else
            {
              document.getElementById("mySidenav").style.width = "300px";
              document.getElementById("mySidenav").style.paddingLeft = "2%";
              document.getElementById("mySidenav").style.paddingRight = "2%";
            document.getElementById("wholeBody").style.marginRight = "300px";
            }
          document.querySelector(".cart_quan").innerText = parseInt(document.querySelector(".cart_quan").innerText) - 1;
      }
      else
      {
        val.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText = document.getElementById(id+'shivy').getAttribute("data-val")*count;
        var subT =  parseInt(document.querySelector('.itemPriceP').getElementsByTagName("span")[0].innerText)- parseInt(document.getElementById(id+'shivy').getAttribute("data-val"));
        document.querySelector('.itemPriceP').getElementsByTagName("span")[0].innerText = subT;
        var gsT =  (subT*5)/100;
        document.querySelector('.gstP').getElementsByTagName("span")[0].innerText = gsT;
        document.querySelector('.gTotalP').getElementsByTagName("span")[0].innerText = gsT+subT;
      }
      if(countEm) countEm.value = count;
      }
    }


function removeItem(id,el,checkout)
{

  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  sessionCart.items.some(function(product,index){
    console.log(product._id);
    if(product._id==id)
    {
      if(!(document.querySelector(".cart_quan").style.display=='none'))
      {
        // alert("happend");
      document.querySelector(".cart_quan").innerText = parseInt(document.querySelector(".cart_quan").innerText)-sessionCart.items[index].quantity;
    }

          sessionCart.items.splice(index,1);
      var subTotal = 0;
      sessionCart.items.forEach(function(productCart,index){
        subTotal += productCart.price*productCart.quantity;
      });

      if(checkout=='yes')
      {
        var subT = subTotal;
        console.log(subT);
        var checkoutDiv = document.getElementById(id+'shivy').parentElement.parentElement.parentElement;
        if(checkoutDiv.previousSibling)
        {
          checkoutDiv.previousSibling.remove();
        }
        else if(checkoutDiv.nextSibling)   checkoutDiv.nextSibling.remove();
        checkoutDiv.remove();

         document.querySelector('.itemPriceP').getElementsByTagName("span")[0].innerText = subT;
        var gsT =  (subT*5)/100;
        document.querySelector('.gstP').getElementsByTagName("span")[0].innerText = gsT;
        document.querySelector('.gTotalP').getElementsByTagName("span")[0].innerText = gsT+subT;

          sessionStorage.setItem("cart",JSON.stringify(sessionCart));

          if(!sessionCart.items.length)
          {
            sessionStorage.removeItem("cart");
           location.href = '/';
         }
      }
      else
      {
        var removeBool = null;
      document.querySelector('.cart_order_place').innerHTML = 'Place order (Rs. ' + subTotal + ')';
      el.parentElement.remove();
      console.log(document.getElementById(id+'shivy'));
      if(!location.pathname.includes("food"))
      {
        if(document.getElementById(id+'shivy')!==null)
        {
        removeBool  = true;
      var reference = document.getElementById(id+'shivy').parentElement;
      var realReference = reference.parentElement;
      reference.remove();
    }
     }
     else if(document.querySelector('.shivy_move')!==null && document.getElementById(id+'shivy')!==null)
      {
        removeBool = false;
        var reference = document.getElementById(id+'shivy').parentElement;
      var realReference = reference.parentElement;
      reference.remove();

      }

      if(!sessionCart.items.length)
      {

          if(document.querySelector(".cart_order_place")!==null)
            document.querySelector(".cart_order_place").style.display="none";
            var empty_image = '<img src="../img/empty_cart_.png" class="empty_cart">';
            empty_image +=  '<h2 class="cart_empty_text"> Your Cart Is Empty</h2>';
            empty_image +=  '<h2 class="cart_empty_text"> Please Fill It</h2>';

            document.querySelector(".cartOrders").innerHTML = empty_image;
            document.querySelector(".anythingdiv").innerHTML = '';


            sessionStorage.clear();

            sessionStorage.removeItem("cart");
      }
      else
      {
    sessionStorage.setItem("cart",JSON.stringify(sessionCart));
    // alert("here");
    // sessionStorage.removeItem("cart");
  }
      // Create the new element
      if(removeBool===true)
      {
   var li = document.createElement('div');
  li.className = 'order_btn'; // Class name
  li.innerHTML = 'Add To Cart'; // Text inside
   li.setAttribute("onclick","openNav('"+id+"',this);");
    realReference.appendChild(li); // Append it
  }
  else if(removeBool===false)
  {
       var li = document.createElement('div');
  li.className = 'add_to_cart_btn'; // Class name
  li.innerHTML = 'Add To Cart'; // Text inside
   li.setAttribute("onclick","openNav('"+id+"',this);");
    realReference.appendChild(li); // Append it

  }

  }

 // Attach the event!
      // realReference.appendChild('<div class="order_btn" onclick="openNav('+id+',this)">ORDER</div>');
      // realReference.innerHTML += ;

      return true;
    }
  });
}

document.querySelector(".cart_quan").addEventListener("click",function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.paddingLeft = "5%";
  document.getElementById("mySidenav").style.paddingRight = "5%";
  // document.getElementById("wholeBody").style.marginRight = "300px";
}
else
{
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "300px";
}
});

document.querySelector(".shopping_cart").addEventListener("click",function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.paddingLeft = "5%";
  document.getElementById("mySidenav").style.paddingRight = "5%";
  // document.getElementById("wholeBody").style.marginRight = "300px";
}
else
{
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "300px";
}
});

document.querySelector(".openCartItems").addEventListener("click",function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.paddingLeft = "5%";
  document.getElementById("mySidenav").style.paddingRight = "5%";
  // document.getElementById("wholeBody").style.marginRight = "300px";
}
else
{
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "300px";
}
});

function showLoginModal() {
  document.querySelector('.login-modal').style.transform = 'translateY(0px)';
  document.querySelector('.login-backdrop').style.opacity = '1';
  document.querySelector('.login-backdrop').style.display = 'block';
}

function showSignupModal() {
  document.querySelector('.signup-modal').style.transform = 'translateY(0px)';
  document.querySelector('.signup-backdrop').style.opacity = '1';
  document.querySelector('.signup-backdrop').style.display = 'block';
}

function showResetModal() {
  document.querySelector('.reset-modal').style.transform = 'translateY(0px)';
  document.querySelector('.reset-backdrop').style.opacity = '1';
  document.querySelector('.reset-backdrop').style.display = 'block';
}

function hideLoginModal() {
  document.querySelector('.login-modal').style.transform = 'translateY(-100vh)';
  document.querySelector('.login-backdrop').style.opacity = '0';
  document.querySelector('.login-backdrop').style.display = 'none';
}


function hideSignupModal() {
  document.querySelector('.signup-modal').style.transform = 'translateY(-100vh)';
  document.querySelector('.signup-backdrop').style.opacity = '0';
  document.querySelector('.signup-backdrop').style.display = 'none';
}

function hideResetModal() {
  document.querySelector('.reset-modal').style.transform = 'translateY(-100vh)';
  document.querySelector('.reset-backdrop').style.opacity = '0';
  document.querySelector('.reset-backdrop').style.display = 'none';
  hideLoginModal();
}
