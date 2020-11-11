var no = 1;
var addbar = false;

document.getElementById("addbtn").addEventListener('click', ()=>{ 
    const addbtn = `
        <div class="userproduct">
            <div class="form-control-lg">
                <input type="Text" id="proname" placeholder="Enter Product name here">
                <input type="Number" id="qty" placeholder="Enter Product Quantity here">
                <button class="add">ADD</button>
            </div>
        </div>
    `;
    if(!addbar)
    {
        document.getElementById("addbtn").insertAdjacentHTML('beforebegin',addbtn);    
        addbar = true;
        document.querySelector(".add").addEventListener('click',addrow);
    }
});

var addrow = (e)=>{
    const addedrow = `
        <div class="row">
            <div class="col1">
                <h1>${no}</h1>
            </div>
            <div class="col2">
                <h1>${document.getElementById('proname').value}</h1>
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

