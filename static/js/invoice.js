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

var invoice_number=JSON.parse(document.getElementById("invoice_number").textContent);

var customer_name=JSON.parse(document.getElementById("customer_name").textContent);

var purchase_time=JSON.parse(document.getElementById("purchase_time").textContent);

var sold_products_details=JSON.parse(document.getElementById("sold_products_details").textContent);

var tax_amount=JSON.parse(document.getElementById("tax_amount").textContent);

var total_discount=JSON.parse(document.getElementById("total_discount").textContent);

var invoice_amount=JSON.parse(document.getElementById("invoice_amount").textContent);

console.log(invoice_number)
console.log(customer_name)
console.log(purchase_time)
console.log(sold_products_details)
console.log(tax_amount)
console.log(total_discount)
console.log(invoice_amount)
console.log("hi")
//////////////////////////////////////////////



