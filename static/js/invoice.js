console.log("here in invoice");

//code for artificial loader

const load = `<div class="preset">
	    <div class="wrapper">
	      <ul>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	      </ul>
    </div>
  </div>`;

//procedure for artificial loader
document.querySelector("body").style.visibility = "hidden";
document.getElementById("loader").insertAdjacentHTML("afterbegin",load);
document.querySelector("#loader").style.visibility = "visible";
 
setTimeout(function () {
    document.querySelector("#loader").style.display = "none"; 
    document.querySelector("body").style.visibility = "visible"; 
    }, 3000);

//getting data from backend

//////////////////////////////////////////////



