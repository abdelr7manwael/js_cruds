// storage 
// local 
// localStorage.setItem('student-name', "hany");
// var x = localStorage.getItem('student-name')
// console.log(x)
// // data => obj 
// data = {
//     name : "Ali",
//     address: "Cairo",
//     Age: 25
// }

// localStorage.setItem("student-data", JSON.stringify(data))
// // json 
// console.log(JSON.parse(localStorage.getItem('student-data'))['name']);

// JSON.stringify
// JSON.parse

// -----------------------------------------------------

var pname = document.getElementById('pname');
var pprice = document.getElementById('pprice');
var pcategory = document.getElementById('pcategory');
var pdesc = document.getElementById('pdesc');
var tbaleBody = document.querySelector('.table tbody');
var form = document.querySelector('.form-section form');

var insertBtn = document.querySelector('form .btns .insert');
var updateBtn = document.querySelector('form .btns .update');

var pList = [];
if(localStorage.getItem('pList') !== null){
    pList = JSON.parse(localStorage.getItem('pList'));
    displayOnTable();
}

function addNewProduct(){

    if(pname.value != '' && pprice.value != '' && pdesc.value != '' && pcategory.value != ''){
        document.querySelector('.alert').classList.add('d-none');
        row = {
            name: pname.value,
            price: pprice.value,
            category: pcategory.value,
            desc: pdesc.value
        }
        pList.push(row)
        localStorage.setItem('pList', JSON.stringify(pList))
        displayOnTable();
        form.reset();
    }else{
        document.querySelector('.alert').classList.remove('d-none');
    }
    

}


function displayOnTable(){
    if(pList.length > 0){
        tbaleBody.innerHTML = '';
        pList.forEach( (p, index) =>{
            tbaleBody.innerHTML += `
                <tr>
                    <th>${index + 1}</th>
                    <td>${p['name']}</td>
                    <td>${p['price']}</td>
                    <td>${p['category']}</td>
                    <td>${p['desc']}</td>
                    <td>
                        <button class="btn btn-info" onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
                `
        });
    }

    
}

function deleteProduct(id){
    if(confirm('Are you Sure?') ){
        pList.splice(id, 1);
        localStorage.setItem('pList', JSON.stringify(pList));
        displayOnTable();
    }
}

function editProduct(id){
    var product = pList[id];
    pname.value = product['name']
    pprice.value = product['price']
    pcategory.value = product['category']
    pdesc.value = product['desc']
    insertBtn.classList.add('d-none');

    updateBtn.innerHTML = `
        <button type="button" class="btn btn-primary" onclick="updateProduct(${id})">Update</button>
        <button type="button" class="btn btn-outline-primary" onclick="endUpdate()">Cancel</button>
    `
}

function endUpdate(){
    form.reset();
    updateBtn.innerHTML = '';
    insertBtn.classList.remove('d-none');
}

function updateProduct(id){
    var product = pList[id];

    product['name'] = pname.value;
    product['price'] = pprice.value;
    product['desc'] = pdesc.value;
    product['category'] = pcategory.value;
    localStorage.setItem('pList', JSON.stringify(pList));
    displayOnTable();
    endUpdate();

}


function searchProduct(term){
    if( term != ''){
        tbaleBody.innerHTML = '';
        pList.forEach((p, index) => {
            if(p['name'].toLowerCase().includes(term.toLowerCase())){
                tbaleBody.innerHTML += `
                <tr>
                    <th>${index + 1}</th>
                    <td>${p['name']}</td>
                    <td>${p['price']}</td>
                    <td>${p['category']}</td>
                    <td>${p['desc']}</td>
                    <td>
                        <button class="btn btn-info" onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
                `
            }
        })
        
    }else{
        displayOnTable();
    }
}