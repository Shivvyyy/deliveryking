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
