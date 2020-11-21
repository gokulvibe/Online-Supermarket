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
/*
console.log(invoice_number)
console.log(customer_name)
console.log(purchase_time)
console.log(sold_products_details)
console.log(tax_amount)
console.log(total_discount)
console.log(invoice_amount)
*/
////////////////////////////////////////////// loading the html //////////////////////////////////
/*
`
    <div class="container">
        <h2>INVOICE</h2>
        <hr>
        <div class="custinfo">
            <p>BILL TO: [Customer Name]</p>
            <p>INVOICE NUMBER: [number]</p>
            <p>DATE: [date]</p>
        </div>
        <div class="billinfo">
            <div class="inrow head">
                <div class="col1">
                    <p>Description</p>
                </div>
                <div class="col2">
                    <p>Quantity</p>
                </div>
                <div class="col3">
                    <p>Amount</p>
                </div>
            </div>
            
            <div class="inrow">
                <div class="col1">
                    <p>[Item Name]</p>
                </div>
                <div class="col2">
                    <p>[Quantity]</p>
                </div>
                <div class="col3">
                    <p>[Amount]</p>
                </div>
            </div>
        <hr>
        
        <!-- tax and discount-->
        <div class="inrow">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>[Tax]</p>
                </div>
                <div class="col3">
                    <p>[Amount]</p>
                </div>
        </div>
        
        <div class="inrow">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>[Discount]</p>
                </div>
                <div class="col3">
                    <p>[Amount]</p>
                </div>
        </div>
        
        <!-- total-->
        <div class="inrow total">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>[Total]</p>
                </div>
                <div class="col3">
                    <p>[Amount]</p>
                </div>
        </div>
        
    </div>
`
*/

var bill = `
    <div class="container">
        <h2>INVOICE</h2>
        <hr>
        <div class="custinfo">
            <p>BILL TO   :    ${customer_name}</p>
            <p>INVOICE NUMBER   :    ${invoice_number}</p>
            <p>DATE & TIME   : ${purchase_time}</p>
        </div>
        <div class="billinfo">
            <div class="inrow head">
                <div class="col1">
                    <p>Description</p>
                </div>
                <div class="col2">
                    <p>Quantity</p>
                </div>
                <div class="col3">
                    <p>Amount</p>
                </div>
            </div>
        <div class="entry"></div>
        
        <!-- tax and discount-->
        <div class="inrow">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>Tax</p>
                </div>
                <div class="col3">
                    <p>Rs ${tax_amount}</p>
                </div>
        </div>
        
        <div class="inrow">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>Discount</p>
                </div>
                <div class="col3">
                    <p>Rs ${total_discount}</p>
                </div>
        </div>
        
        <!-- total-->
        <div class="inrow total">
                <div class="col1">
                    <p></p>
                </div>
                <div class="col2">
                    <p>Total</p>
                </div>
                <div class="col3">
                    <p>Rs ${invoice_amount}</p>
                </div>
        </div>
        
    </div>
`;

document.querySelector(".thanks").insertAdjacentHTML('afterend',bill);

console.log(sold_products_details);
for(item in sold_products_details){
    let content = `
            <div class="inrow">
                <div class="col1">
                    <p>${sold_products_details[item].prod_name}</p>
                </div>
                <div class="col2">
                    <p>${sold_products_details[item].quantity}</p>
                </div>
                <div class="col3">
                    <p>Rs ${sold_products_details[item].total_cost}</p>
                </div>
            </div>
    `;
    document.querySelector(".entry").insertAdjacentHTML('beforebegin',content);
}
