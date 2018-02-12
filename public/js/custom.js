//Change review box
function change_box(shivy,what_box,last_box)
{
  var element = document.getElementById(what_box);
  var element2 = document.getElementById(last_box);
  element.classList.toggle('display');
  element2.classList.toggle('display');
}


//For navbar
