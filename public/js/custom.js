document.addEventListener("DOMContentLoaded", function(event) {

  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  var htmlText =  document.querySelector('.cartOrders');


  if(sessionCart!==null)
  {
    document.querySelector(".cart_order_place").style.display="block";
      htmlText.innerHTML = '';
    var cart_quantity = 0;
  sessionCart.items.forEach(function(product,index){

    var cartOrder = '';
   cartOrder += '<div class="cart_order">';
   cartOrder += '<div class="cart_order_title"><span>';
   if(product.nonVeg)
     cartOrder +=   '<img src="../img/non-veg-icon.png" class="food_icon_cart">';
  else
     cartOrder +=   '<img src="../img/veg-icon.png" class="food_icon_cart">';

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



// el.preventDefault();

    var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 201) {

     var product = JSON.parse(this.response);

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
        cartOrder += '<input type="text" data-val="'+product.product.price+'" value="1" id="'+product.product._id+'">';
        cartOrder += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
        cartOrder += '</div>';
        cartOrder += '</div>';

       cartOrder += '<div class="cart_order_price">';
        cartOrder += 'Rs <span>'+product.product.price+'</span>';
        cartOrder += '</div>';

      cartOrder += '</div>';



        var sessionCart = JSON.parse(sessionStorage.getItem("cart"));

        if(sessionCart === null)
        {
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
          cartItems.push(item);
          cart.total = 0;
          cart.items = cartItems;

          sessionStorage.setItem("cart",JSON.stringify(cart));
          // alert("yes")
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
          console.log(sessionCart);
          sessionCart.items.push(item);
          sessionStorage.setItem("cart",JSON.stringify(sessionCart));
        }

        console.log(JSON.parse(sessionStorage.getItem("cart")));

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
     // document.getElementById("wholeBody").style.marginRight = "18%";
     document.querySelector(".cartOrders").style.display = "block";
}
else
{
  document.getElementById("mySidenav").style.width = "18%";
    document.getElementById("mySidenav").style.paddingLeft = "2%";
    document.getElementById("mySidenav").style.paddingRight = "2%";
    document.getElementById("wholeBody").style.marginRight = "18%";
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
            count = sessionCart.items[index].quantity;
          console.log(sessionCart.items[index]);
          sessionCart.items[index].quantity++;
          sessionStorage.setItem("cart",JSON.stringify(sessionCart));
          return true;
          // alert(id);
        }
      });
        var countEl = document.getElementById(id);
        var countEm = document.getElementById(id+'shivy');
        // console.log(id);
        // console.log(countEl);
        // console.log(countEm);
        count++;
        if(countEl)
        {
        countEl.value = count;
        // console.log(  countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0]);
        countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText =  countEl.getAttribute("data-val")*count;

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("mySidenav").style.paddingLeft = "5%";
        document.getElementById("mySidenav").style.paddingRight = "5%";
        // document.getElementById("wholeBody").style.marginRight = "18%";
      }
      else
      {
        document.getElementById("mySidenav").style.width = "18%";
        document.getElementById("mySidenav").style.paddingLeft = "2%";
        document.getElementById("mySidenav").style.paddingRight = "2%";
        document.getElementById("wholeBody").style.marginRight = "18%";
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
        countEm.value = count;


        // document.getElementById("main").classList.remove("home_main");
    }
    function minus(id,val){

      var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
      sessionCart.items.some(function(product,index){
        console.log(product._id);
        if(product._id==id&&product.quantity>1)
        {
        count = sessionCart.items[index].quantity;
        console.log(sessionCart.items[index]);
        sessionCart.items[index].quantity--;
        sessionStorage.setItem("cart",JSON.stringify(sessionCart));
        // alert(id);

        // document.getElementById("main").classList.remove("home_main");
        return true;
      }

    });

      if (count > 1) {
        var countEl = document.getElementById(id);
        var countEm = document.getElementById(id+'shivy');
        count--;
        if(countEl)
        {
        countEl.value = count;
        countEl.parentElement.parentElement.nextElementSibling.getElementsByTagName('span')[0].innerText =  countEl.getAttribute("data-val")*count;

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        {

                document.getElementById("mySidenav").style.width = "100%";
                document.getElementById("mySidenav").style.paddingLeft = "5%";
                document.getElementById("mySidenav").style.paddingRight = "5%";
              // document.getElementById("wholeBody").style.marginRight = "18%";
            }

            else
            {
              document.getElementById("mySidenav").style.width = "18%";
              document.getElementById("mySidenav").style.paddingLeft = "2%";
              document.getElementById("mySidenav").style.paddingRight = "2%";
            document.getElementById("wholeBody").style.marginRight = "18%";
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
        countEm.value = count;
      }
    }


function removeItem(id,el)
{
  // alert(id);
  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  sessionCart.items.some(function(product,index){
    console.log(product._id);
    if(product._id==id)
    {
      document.querySelector(".cart_quan").innerText = parseInt(document.querySelector(".cart_quan").innerText)-sessionCart.items[index].quantity;
      sessionCart.items.splice(index,1);

      el.parentElement.remove();
      var reference = document.getElementById(id+'shivy').parentElement;
      var realReference = reference.parentElement;
      reference.remove();
      if(!sessionCart.items.length)
      {

            document.querySelector(".cart_order_place").style.display="none";
            var empty_image = '<img src="../img/empty_cart_.png" class="empty_cart">';
            empty_image +=  '<h2 class="cart_empty_text"> Your Cart Is Empty</h2>';
            empty_image +=  '<h2 class="cart_empty_text"> Please Fill It</h2>';

            document.querySelector(".cartOrders").innerHTML = empty_image;
            sessionStorage.clear();
      }
      else
      {
    sessionStorage.setItem("cart",JSON.stringify(sessionCart));
  }
      // Create the new element
   var li = document.createElement('div');
  li.className = 'order_btn'; // Class name
  li.innerHTML = 'ORDER'; // Text inside
   li.setAttribute("onclick","openNav('"+id+"',this);");
    realReference.appendChild(li); // Append it

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
  // document.getElementById("wholeBody").style.marginRight = "18%";
}
else
{
  document.getElementById("mySidenav").style.width = "18%";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "18%";
}
});

document.querySelector(".shopping_cart").addEventListener("click",function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.paddingLeft = "5%";
  document.getElementById("mySidenav").style.paddingRight = "5%";
  // document.getElementById("wholeBody").style.marginRight = "18%";
}
else
{
  document.getElementById("mySidenav").style.width = "18%";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "18%";
}
});

document.querySelector(".openCartItems").addEventListener("click",function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.paddingLeft = "5%";
  document.getElementById("mySidenav").style.paddingRight = "5%";
  // document.getElementById("wholeBody").style.marginRight = "18%";
}
else
{
  document.getElementById("mySidenav").style.width = "18%";
  document.getElementById("mySidenav").style.paddingLeft = "2%";
  document.getElementById("mySidenav").style.paddingRight = "2%";
  document.getElementById("wholeBody").style.marginRight = "18%";
}
});
