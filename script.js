let itemContainer = document.querySelector('.lower-container')

async function dataFill(){
    let fetchData = await fetch('http://localhost:3000/Data')
    let jsonData = await fetchData.json()
    itemContainer.innerHTML = jsonData.map(item => `
        <div class="item-box">
            <div class="id first">${item.id}</div>
            <div class="company first">${item.company}</div>
            <div class="price first">${item.price}</div>
            <div class="image"><img src="${item.image}" alt=""></div>
            <div class="edit" onclick="editButton('${item.id}')">edit</div>
            <div class="remove" onclick="removeItem('${item.id}')">remove</div>
        </div>`).join('')        
}

dataFill();

function removeItem(id){
    let confirmtoDelete = confirm('delete item  ' + id);
    if(confirmtoDelete){
        fetch(`http://localhost:3000/Data/${id}`,
            {method : 'DELETE'}
        )
        console.log('deleted clicked ');
    }else{
        return;
    }
    }

function insetdata(){
    let newdata = {
        company : document.querySelector('.company-input-box').value,
        price : document.querySelector('.price-input-box').value,
        image : document.querySelector('.image-input-box').value
    }
    let confirmInsert = confirm('Confirm insert!');
    if(confirmInsert){    
        fetch(`http://localhost:3000/Data`,{
            method:'POST',
            headers:{'content-type':'applicatin/JSON'},
            body:JSON.stringify(newdata)
        })
    }
}

async function editButton(id){
    // alert('sorry! edit function is not working now!!');
    let editContainer = document.querySelector('.edit-container')
    let jsondata = await fetch(`http://localhost:3000/Data/${id}`)
    let data = await jsondata.json();
    editContainer.innerHTML =`
        <div class="edit-box">
            <div class="edit-id">
                <label for="">id</label>
                <input type="text" value="${data.id}"  name="" id="id1">
            </div>
            <div class="edit-company">
                <label for="">company</label>
                <input type="text" value="${data.company}"  name="" id="company1">
            </div>
            <div class="edit-price">
                <label for="">price</label>
                <input type="text" value="${data.price}" name="" id="price1">
            </div>
            <div class="edit-image">
                <label for="">image</label>
                <input type="text" value="${data.image}" name="" id="image1">
            </div>
            <input type="submit" onclick="update('${data.id}')">
            
            </div>
    `
}


function update(id){
    let updateData = {
        id:document.querySelector('#id1').value,
        company : document.querySelector('#company1').value,
        price : document.querySelector('#price1').value,
        image : document.querySelector('#image1').value
    }
    // let confirmInsert = confirm('Confirm edit!' + id);
    // if(confirmInsert)
        {    
        fetch(`http://localhost:3000/Data/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'applicatin/JSON'
            },
            body:JSON.stringify(updateData)
        })
    } 
    console.log(updateData);
}
