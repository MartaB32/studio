/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdown_menu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//swipe up/down pianoroll
function swipe(){
  let pianoroll = document.getElementById("pianoroll");
  let pianoroll_instances = document.getElementById("pianoroll_instances");
  if(pianoroll.style.height=="100%")
  {
    pianoroll_instances.style.height="20%";
    pianoroll.style.height="25%";
  }
  else
  {
    pianoroll_instances.style.height="95%";
    pianoroll.style.height="100%";
  }
}