document.addEventListener("DOMContentLoaded", function(event) {


alert("DOM fully loaded and parsed");


var xhr = new XMLHttpRequest();
xhr.open("GET", "/categories", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 201) {
        categoriesResponse = JSON.parse(xhr.response);
        console.log(categoriesResponse)
          var htmlText =  document.querySelector('.home_main');
          while (htmlText.firstChild) htmlText.removeChild(htmlText.firstChild);

      categoriesResponse.forEach(function(category)
    {
      alert(category._id)
        var div = '';
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/products/"+category._id+'/4', true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            var response = JSON.parse(xhr.response);
            console.log(response);

            div += '<div class="menu-wrapper" id="'+response[0].category.name+'">';
            div += '<div class="menu-header">';
            div += '<div class="line">';
            div +=  '<img src = "../img/line2.png"/>';
            div +=  '</div>';
            div +=  '<h1 class="menu-heading">'+response[0].category.name+'</h1>';
            div +=  '<div class="line">';
            div +=  '<img src = "../img/line.png"/>';
            div += '        </div>  </div>';
            if(response[0].category.desc)
            div += '<div class="description">'+response[0].category.desc+'</div><br/> <br/>';
            else
            div += '<div class="description">Chef Made</div><br/> <br/>';

                div += '  <div class="food-items">';

            response.forEach(function(product,index){

                  console.log(index)

              div += ' <div class="food-item">';
              div +=  '<a href="foods"><a href="foods">';


              div +=  '<img src="'+product.prodImg+'">';


              div +=   '</a></a>';
              div +=  '<div class="food-item-titles">';
              div +=  '<div class="food-item-title"><span>';
              if(product.nonVeg)
              div += '<img src="../img/non-veg-icon.png" class="food_icon">';
              else
              div += '<img src="../img/veg-icon.png" class="food_icon">';
              div +=  product.name+'</span> </div>';
              div +=  '<div class="food-item-price">Rs. '+product.price+'</div>';
              div +=    '  <div class="food-item-content">Aloo/Mushroom/Water</div>';
              div +=  '<div class="order_btn" onclick="openNav()">ORDER</div>';
              div +=  '</div>';
              div +=   '</div>';

            });


            div += '</div></div>';

            htmlText.innerHTML += div;

          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);

    });
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);








//Change review box
function change_box(shivy,what_box,last_box)
{
  var element = document.getElementById(what_box);
  var element2 = document.getElementById(last_box);
  element.classList.toggle('display');
  element2.classList.toggle('display');
}


//side push



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  // alert("shivy");
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.paddingLeft = "2%";
    document.getElementById("mySidenav").style.paddingRight = "2%";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("main").classList.remove("home_main");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {

   document.getElementById("mySidenav").style.paddingLeft = "0px";
   document.getElementById("mySidenav").style.paddingRight = "0px";
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginRight = "5%";
    document.getElementById("main").classList.add("home_main");
}



//cart quanity

    var count = 1;
    var countEl = document.getElementById("count");
    function plus(){
        count++;
        countEl.value = count;
    }
    function minus(){
      if (count > 1) {
        count--;
        countEl.value = count;
      }
    }

});
