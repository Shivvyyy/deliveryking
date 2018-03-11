document.addEventListener("DOMContentLoaded", function(event) {

  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  var htmlText =  document.querySelector('.cartOrders');
  htmlText.innerHTML = '';

  if(sessionCart!==null)
  {
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
       cartOrder += '<input type="text" value="'+product.quantity+'" id="'+product._id+'" disabled>';
       cartOrder +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
       cartOrder += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
       cartOrder += '</div>';
       cartOrder += '</div>';

      cartOrder += '<div class="cart_order_price">';
       cartOrder += 'Rs 250';
       cartOrder += '</div>';

     cartOrder += '</div>';


          htmlText.innerHTML += cartOrder;


  });

}



});



//side push



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav(product,el) {
  // alert("shivy");
  // alert(product);




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
        cartOrder += '<input type="text" value="1" id="'+product.product._id+'">';
        cartOrder +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
        cartOrder += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
        cartOrder += '</div>';
        cartOrder += '</div>';

       cartOrder += '<div class="cart_order_price">';
        cartOrder += 'Rs 250';
        cartOrder += '</div>';

      cartOrder += '</div>';


      var oldhtmlText = htmlText.innerHTML;
      for(var i = 0; i < htmlText.length; i++)
          htmlText.removeChild(children[i]);

      htmlText.innerHTML = cartOrder;
      htmlText.innerHTML += oldhtmlText;

        var sessionCart = JSON.parse(sessionStorage.getItem("cart"));

        if(sessionCart === null)
        {
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
          alert("yes")
        }


        else
        {
          alert("Shivy");
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
    quantityBtn += '<input type="text" value="1" id="'+input_shivy+'">';
    quantityBtn +=  '<input type="button" value="-" id="moins" onclick="minus('+productId+')">';
    quantityBtn += '<input type="button" value="+" id="plus" onclick="plus('+productId+')">';
    quantityBtn += '</div>';
    shivyMove.innerHTML += quantityBtn;
   }

 };
 xhttp.open("GET", "/foodCart/"+product, true);
 xhttp.send();

    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.paddingLeft = "2%";
    document.getElementById("mySidenav").style.paddingRight = "2%";
    document.getElementById("wholeBody").style.marginRight = "250px";
    // document.getElementById("main").classList.remove("home_main");


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

    function plus(id){

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
        count++;
        countEl.value = count;
        countEm.value = count;

        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenav").style.paddingLeft = "2%";
        document.getElementById("mySidenav").style.paddingRight = "2%";
        document.getElementById("wholeBody").style.marginRight = "250px";
        // document.getElementById("main").classList.remove("home_main");
    }
    function minus(id){

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

        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenav").style.paddingLeft = "2%";
        document.getElementById("mySidenav").style.paddingRight = "2%";
      document.getElementById("wholeBody").style.marginRight = "250px";
        // document.getElementById("main").classList.remove("home_main");
        return true;
      }

    });

      if (count > 1) {
        var countEl = document.getElementById(id);
        var countEm = document.getElementById(id+'shivy');
        count--;
        countEl.value = count;
        countEm.value = count;
      }
    }


function removeItem(id,el)
{
  alert(id);
  var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
  sessionCart.items.some(function(product,index){
    console.log(product._id);
    if(product._id==id)
    {
      sessionCart.items.splice(index,1);
      sessionStorage.setItem("cart",JSON.stringify(sessionCart));
      el.parentElement.remove();
      var reference = document.getElementById(id+'shivy').parentElement;
      var realReference = reference.parentElement;
      reference.remove();

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
