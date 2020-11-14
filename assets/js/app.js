var no = 1,choice = 1;
var addbar = false;

console.log('yes this is still working');

document.getElementById("addbtn").addEventListener('click', ()=>{ 
    const addbtn = `
        <div class="userproduct">
            <div class="form-control-lg">
                <input type="Text" id="proname" placeholder="Enter Product name here">
                <input type="Number" id="qty" placeholder="Enter Product Quantity here">
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

var addrow = (itemname)=>{
    const addedrow = `
        <div class="row">
            <div class="col1">
                <h1>${no}</h1>
            </div>
            <div class="col2">
                <h1>${itemname}</h1>
            </div>
            <div class="col3">
                <h1>${document.getElementById('qty').value}</h1>
            </div>
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
function loadResult(name,id)
{
    var addres = `
        <div class="row options" id=${'choice'+id}>
            <div class="col2">
                <h1>${name}</h1>
            </div>
            <button type="button">ADD</button>
        </div>
    `;
    document.getElementById("addbtn").insertAdjacentHTML('beforebegin',addres);
    document.getElementById("choice"+id).addEventListener('click',(e)=>{
        addrow(document.getElementById('choice'+id).children[0].children[0].innerText);
        clearSearchResults();
    });
}

//creating a function to search for the matching results and load them
function searchResult()
{
    userinput = document.getElementById('proname').value;
    for(item in obj)
    {
        if(item.includes(userinput))
            loadResult(item,choice++);
    }
}



////////////////////////////////////////       DESTRUCTIVE FUNCTIONS //////////////////////////////

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


