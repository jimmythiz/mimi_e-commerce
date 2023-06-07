const customBox = document.querySelector(`.custom_box`)
const selectBox = document.querySelector(`.select_box`)
const selectBox2 = document.querySelector(`.select_box2`)
const checkingBox = document.querySelector(`.checking_out`)
const startCircle = document.querySelector(`.circle`)
const checkOutbtn = document.getElementById(`checkOutbtn`)
const newItem = document.getElementById(`newItem`)
const clearAll = document.getElementById(`clearAll`)
const tbody = document.getElementById(`tbody`)


let items = [
    {
        product : `biscuit`,
        price : 50
    },
    {
        product : `Pure Water`,
        price : 20
    },
    {
        product : `Bread`,
        price : 150
    },
    {
        product : `Fanta`,
        price : 200
    },
    {
        product : `Egg`,
        price : 80
    },
]

startCircle.addEventListener(`click`,openSelectBox)
function openSelectBox(){
    customBox.classList.add("hide")
    selectBox.classList.remove("hide")
}
let savedProducts = []

newItem.addEventListener(`click`,addItemList)
function addItemList() {
    
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('items', 'd-flex', 'justify-content-space-between',`align-items-center`, 'mb-5');
    const itemDiv2 = document.createElement(`div`)
    itemDiv2.classList.add(`me-3`)
    const paragraph = document.createElement(`p`)
    paragraph.classList.add(`mb-0`)
    paragraph.innerHTML = `Select an item:`
    const select = document.createElement(`select`)
    select.classList.add(`form-select`) 
    select.id = `mySelect`
    select.addEventListener('change', (event) => {
        function disableAll(){
            inputquantity.disabled = true
            inputquantity.value = 0
            totalPricedivSpan.innerHTML = `$00.00`

        }
        const selectedOptionValue = event.target.value;
        const price = items[selectedOptionValue].price;
        divSpan.innerHTML = `$${price}`;
        disableAll()
        inputquantity.disabled = false;

        const selectedProductName = items[selectedOptionValue].product;
        
    });
    const optiondefault = document.createElement(`option`)
    optiondefault.innerHTML = `Select item...`
    optiondefault.setAttribute("selected", true)
    optiondefault.disabled = true;
    select.appendChild(optiondefault)
    for (let i = 0; i< items.length;i++){
        const option = document.createElement(`option`)
        option.setAttribute("value",i)
        option.innerHTML = items[i].product
        select.appendChild(option)
    }

    const seconditemDiv = document.createElement(`div`)
    seconditemDiv.classList.add(`mx-5`)
    const secondparagraph = document.createElement(`p`)
    secondparagraph.innerHTML = `Price:`
    const divSpan = document.createElement(`div`)
    itemDiv2.appendChild(paragraph)
    itemDiv2.appendChild(select)
    itemDiv.appendChild(itemDiv2)
    divSpan.innerHTML = `$00.00`
    seconditemDiv.appendChild(secondparagraph)
    seconditemDiv.appendChild(divSpan)
    itemDiv.appendChild(seconditemDiv);

    const quantityDiv = document.createElement(`div`)
    const form = document.createElement(`form`)
    const quantityDiv2 = document.createElement(`div`)
    const label = document.createElement(`label`)
    label.classList.add('form-label', 'mb-0');
    label.innerHTML = `Enter Quantity:`
    const inputquantity = document.createElement(`input`)
    inputquantity.classList.add(`form-control`) 
    inputquantity.setAttribute("type","number")
    inputquantity.setAttribute("min", "0")
    inputquantity.setAttribute("step", "1")
    inputquantity.disabled = true;
    inputquantity.addEventListener(`keypress`, function(event) {
        if (event.keyCode === 45) { 
          event.preventDefault(); 
          checkingInputs()
        }
    });
    inputquantity.addEventListener("paste", function(event) {
        event.preventDefault();
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData("text");
        const numericValue = Number(pastedText);
        if (numericValue < 0) {
          return false;
        } else {
          inputBox.value = numericValue; 
          checkingInputs()
        }
    });
    inputquantity.addEventListener(`keyup`,function(event){
        const currentPrice = parseFloat(divSpan.innerHTML.substring(1))
        const inputtyped = parseFloat(event.target.value)
        const forwardDisplay1 = inputtyped * currentPrice
        totalPricedivSpan.innerHTML = `$${forwardDisplay1}`
        if (event.target.value == ``){
            totalPricedivSpan.innerHTML = `$00.00`
            checkingInputs()
        }
    })

    inputquantity.addEventListener('change', (event) => {
        const selectedOptionValue = parseFloat(event.target.value);
        const currentPrice = parseFloat(divSpan.innerHTML.substring(1))
        const forwardDisplay = selectedOptionValue * currentPrice
        totalPricedivSpan.innerHTML = `$${forwardDisplay}`
        checkingInputs()
    });
    inputquantity.addEventListener("input", function() {
        this.value = Math.round(this.value);
    });

    quantityDiv2.appendChild(label)
    quantityDiv2.appendChild(inputquantity)
    form.appendChild(quantityDiv2)
    quantityDiv.appendChild(quantityDiv2)
    itemDiv.appendChild(quantityDiv)


    const totalpriceDiv = document.createElement(`div`)
    totalpriceDiv.classList.add(`mx-5`)
    const totalpriceParagraph = document.createElement(`p`)
    totalpriceParagraph.innerHTML = `Total Price:`
    const totalPricedivSpan = document.createElement(`div`)
    totalPricedivSpan.id = `totalprices`
    totalPricedivSpan.innerHTML = `$ 00.00`
    totalpriceDiv.appendChild(totalpriceParagraph)
    totalpriceDiv.appendChild(totalPricedivSpan)
    itemDiv.appendChild(totalpriceDiv)

    

    const saveElement = document.createElement(`div`)
    saveElement.classList.add(`mx-5`)
    const saveparagraph = document.createElement(`div`)
    saveparagraph.classList.add(`rounded-pill`,`p-2`,`text-bg-success`)
    saveparagraph.setAttribute("role","button")
    saveparagraph.innerHTML = `Save`
    saveElement.appendChild(saveparagraph)
    itemDiv.appendChild(saveElement)


    function checkingInputs(){
    if (inputquantity.value == `` || inputquantity.value ==0){
        saveElement.classList.add("disabled")
    } else {
        saveElement.classList.remove("disabled")
    }
}
    saveElement.addEventListener(`click`,function(e){
        const selectedQuantity = parseFloat(inputquantity.value);
        const selectedPrice = parseFloat(divSpan.innerHTML.substring(1));
        let pricelisting = parseFloat(totalPricedivSpan.innerHTML.substring(1))
        const productName = select.options[select.selectedIndex].text;
        

        const newItem = {
            product: productName,
            price: selectedPrice,
            quantity: selectedQuantity,
            totalPrice: pricelisting
        };
        savedProducts.push(newItem)
        inputquantity.disabled = true
        saveElement.style.display = `none`
        saveElement.disabled = true
        select.disabled = true

    })
    checkingInputs()
    const deleteElement = document.createElement(`div`)
    const deleteparagraph = document.createElement(`div`)
    deleteparagraph.classList.add(`rounded-pill`,`p-2`,`text-bg-danger`)
    deleteparagraph.setAttribute("role","button")
    deleteparagraph.innerHTML = `Delete`
    deleteElement.appendChild(deleteparagraph)
    itemDiv.appendChild(deleteElement)
    deleteElement.addEventListener(`click`,function (e){
        itemDiv.remove()
        
        let pricelisting = parseFloat(totalPricedivSpan.innerHTML.substring(1))
        const productName = select.options[select.selectedIndex].text;
        const selectedPrice = parseFloat(divSpan.innerHTML.substring(1));
        const selectedQuantity = parseFloat(inputquantity.value);

        var index = savedProducts.findIndex(function(element) {
            return element.price == selectedPrice && element.product == productName && element.quantity == selectedQuantity && element.totalPrice == pricelisting;
          });
        savedProducts.splice(index, 1);




    })

    selectBox2.appendChild(itemDiv)
}
clearAll.addEventListener(`click`,clearallInputs)
function clearallInputs(){
    selectBox2.innerHTML=``
    savedProducts = []
}
checkOutbtn.addEventListener(`click`,openCheckOutbox)
function openCheckOutbox(){
    
    const check1 = selectBox2.children.length-1
    const check2 = savedProducts.length
    if (selectBox2.children.length !== savedProducts.length || selectBox2.children.length===0){

        alert(`Please Save all Selections`)
    
    } else {

        runReceipt()
        selectBox.classList.add("hide")
        checkingBox.classList.remove("hide");
    }
}

function runReceipt(){
    totalCost = []
    for (let i = 0; i<savedProducts.length;i++){

        

    const table = document.createElement(`tr`)
    const tablerow = document.createElement(`th`)
    tablerow.setAttribute("scope","row")
    tablerow.innerHTML = i+1
    const tabled1 = document.createElement(`td`)
    tabled1.innerHTML = savedProducts[i].product

    const tabled2 = document.createElement(`td`)
    tabled2.innerHTML = savedProducts[i].quantity

    const tabled3 = document.createElement(`td`)
    tabled3.innerHTML = `$${savedProducts[i].price}`

    const tabled4 = document.createElement(`td`)
    tabled4.innerHTML = `$${savedProducts[i].totalPrice}`

    totalCost.push(savedProducts[i].totalPrice)
    
    table.appendChild(tablerow)
    table.appendChild(tabled1)
    table.appendChild(tabled2)
    table.appendChild(tabled3)
    table.appendChild(tabled4)
   
    tbody.appendChild(table)

    
    }
    const sum = totalCost.reduce((acc, curr) => acc + curr, 0);
    const billPayable = document.getElementById(`billPayable`)
    billPayable.innerHTML = sum
}