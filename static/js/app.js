var no = 1,choice = 1;
var addbar = false;

console.log('yeah diwali is over now');

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


//getting the data from backend
var stock=JSON.parse(document.getElementById("products-data").textContent);
console.log(stock);

document.getElementById("addbtn").addEventListener('click', ()=>{ 
    const addbtn = `
        <div class="userproduct">
            <div class="form-control-lg">
                <input type="Text" id="proname" placeholder="Enter Product name here">
                <button class="add">Search</button>
            </div>
        </div>
    `;
    if(!addbar)
    {
        document.getElementById("addbtn").insertAdjacentHTML('beforebegin',addbtn);    
        addbar = true;
        document.querySelector(".add").addEventListener('click',searchResult);
    }
});

var addrow = (itemname,itemid,itemprice,itemquantity,itemDiscount)=>{
    if(itemquantity == '')
    {
        alert('please enter the required quantity');
        return;
    }
    const addedrow = `
    <div class="row check">
            <div class="col1">
                <h1>${no}</h1>
            </div>
            <div class="col2">
                <h1>${itemname}</h1>
            </div>
            <div class="col3">
                <h1>${itemquantity}</h1>
            </div>
            <input type="hidden" name="productId" value=${itemid}>
            <input type="hidden" name="productdiscount" value=${itemDiscount}>
        </div>
    `;
    no++;
    document.getElementById("addbtn").insertAdjacentHTML('beforebegin',addedrow);
    document.querySelector(".userproduct").remove();
    addbar = false;
};

//creating a sample obj which will hold product names (this object we will get from the backend)
var obj = {
    'pasta':1,
    'rice':10,
    'bread':2,
    'flour':5,
    'oil':2,
    'eggs':12,
    'honey':2,
    'sugar':1,
    'vingear':3
};

//creating a function to render search results
function loadResult(name,id,productid,productprice,productstock,productDiscount)
{
    var addres = `
    <div class="row options res" id=${'choice'+id}>
            <div class="col2">
                <h1>${name}</h1>
                <h4>Stocks:${productstock}</h4>
                <h4>Rs ${productprice}</h4>
            </div>
            <input class="proqty" type="Number" placeholder="Quantity">
            <button type="button">ADD</button>
            <input type="hidden" name="productId" value=${productid}>
            <input type="hidden" name="productdiscount" value=${productDiscount}>
        </div>
    `;
    document.getElementById("addbtn").insertAdjacentHTML('beforebegin',addres);
    document.getElementById("choice"+id).children[2].addEventListener('click',(e)=>{
        let ele = document.getElementById('choice'+id);
        if(ele.children[1].value > parseInt(ele.children[0].children[1].innerText.substr(7)) || ele.children[1].value<=0 ){
            alert("Please Enter a valid stock quantity");
            return;
        }
            
        addrow(ele.children[0].children[0].innerText,
              ele.children[3].value,
              ele.children[0].children[2],
              ele.children[1].value,
              ele.children[4].value);
        clearSearchResults();
    });
}

//creating a function to search for the matching results and load them
function searchResult()
{
    //unload the not found message
    let div = document.getElementById("noresults");
    if(div!=null)
        div.parentNode.removeChild(div);
    userinput = document.getElementById('proname').value;
    let notFound = true;
    stock.forEach((ele,index,array)=>{
        if(ele.fields.product_name.includes(userinput))
        {
            loadResult(ele.fields.product_name,
                       choice++,
                      ele.pk,
                      ele.fields.base_price,
                      ele.fields.stock_available,
                      ele.fields.discount);
            notFound = false;
        }
    });
    if(notFound)
    {
        const block = `
        <div id="noresults" class="animated fadeIn">
            <img src="{%static 'css/img/cartLogo.png'%}">
            <h2>Opps no results found!</h2>
        </div>
        `;
        document.getElementById("addbtn").insertAdjacentHTML('beforebegin',block);
    }
}

//creating a function to create a object containing all the list item given by the user
//first assign this function to the buy now button
document.querySelector(".buy_button").addEventListener("click",generateList);

function generateList()
{
    var list = {} //this object data will be passed to the backend
    var items = document.querySelector(".container2").children;
    for(let i=2;i<items.length-1;i++)
    {
        if(items[i].classList.contains("row"))
            if(items[i].classList.contains("check"))
                list[items[i].children[3].value] = items[i].children[2].innerText;
    }
    //console.log(items[i].children[1].innerText + " " + items[i].children[2].innerText);
    console.log(list);
}


////////////////////////////////////////       DESTRUCTIVE FUNCTIONS             //////////////////////////////

//function to unload all the search results from the window
function clearSearchResults()
{
    for(let x=1;x<choice;x++)
    {
        div = document.getElementById('choice'+x); 
        div.parentNode.removeChild(div);
    }
    choice = 1;
}


