let data;
function getAllData(){
    fetch('data/test.json', {method: 'GET'
   
})
    .then(function(response){
        if(response.status !== 200){
            alert("ERROR");
            return;
        }
        response.json()
        .then(function(AllData){
            data = AllData;
            start();
            
        });

    }
    )
    .catch(function(error){
        console.log('request filed', error);
    });


    
}

document.addEventListener("DOMContentLoaded", getAllData());
function start(){
let head = document.getElementById("title");
head.innerHTML = data.name;


let head_desc = document.createElement("h2");
let text = document.createTextNode(data.description);
head_desc.appendChild(text);
head_desc.className = "header"
document.getElementById("Description").appendChild(head_desc);
buttons();



}

function buttons(){
data.categories.sort(function(a,b){
    return a.positionNumber - b.positionNumber}
    );

let button1 = document.createElement("button");
button1.innerHTML =  data.categories[0].name;
button1.id =  data.categories[0].id;
document.querySelector(".Buttons").appendChild(button1);


let button2 = document.createElement("button");
button2.innerHTML =  data.categories[1].name;
document.querySelector(".Buttons").appendChild(button2);

let button3 = document.createElement("button");
button3.innerHTML =  data.categories[2].name;
document.querySelector(".Buttons").appendChild(button3);

let button4 = document.createElement("button");
button4.innerHTML =  data.categories[3].name;
document.querySelector(".Buttons").appendChild(button4);


button1.onclick = function(event){
    clearBox();
    sortItems();
    for (i in data.items){
        if(data.categories[0].items[i] == data.items[i].id || data.categories[0].id == data.items[i].categories){
       
        let button = document.createElement("div");
        button.innerHTML = data.items[i].title;
        button.className = "category_items"
        document.querySelector(".Category_content").appendChild(button);
        
        let desc = document.createElement("h4");
        desc.innerHTML = data.items[i].description;
        document.querySelector(".Category_content").appendChild(desc);
        
        let long_desc = document.createElement("p");
        long_desc.innerHTML = data.items[i].long_description;
        document.querySelector(".Category_content").appendChild(long_desc);

        let img = new Image();
        img.src = data.items[i].gallery_images[0].url;
        document.querySelector(".Category_content").appendChild(img);

        }   
    };
}
button2.onclick = function(event){
    clearBox();
    sortItems();
    for (i in data.items){
        if(data.categories[3].items[i] == data.items[i].id || data.categories[3].id == data.items[i].categories){
        let button = document.createElement("div");
        button.className = "category_items"
        button.innerHTML = data.items[i].title;
        document.querySelector(".Category_content").appendChild(button);
        
        let desc = document.createElement("h4");
        desc.innerHTML = data.items[i].description;
        document.querySelector(".Category_content").appendChild(desc);
        
        let long_desc = document.createElement("p");
        long_desc.innerHTML = data.items[i].long_description;
        document.querySelector(".Category_content").appendChild(long_desc);

        let img = new Image();
        img.src = data.items[i].gallery_images[0].url;
        document.querySelector(".Category_content").appendChild(img);
        }
        
    };


}
button3.onclick = function(event){
    clearBox();
    sortItems();
    for (i in data.items){
        if(data.categories[2].items[i] == data.items[i].id || data.categories[2].id == data.items[i].categories){
        let button = document.createElement("div");
        button.className = "category_items"
        button.innerHTML = data.items[i].title;
        document.querySelector(".Category_content").appendChild(button);


        let desc = document.createElement("h4");
        desc.innerHTML = data.items[i].description;
        document.querySelector(".Category_content").appendChild(desc);
        
        let long_desc = document.createElement("p");
        long_desc.innerHTML = data.items[i].long_description;
        document.querySelector(".Category_content").appendChild(long_desc);

        let img = new Image();
        img.src = data.items[i].gallery_images[0].url;
        document.querySelector(".Category_content").appendChild(img);
        };
}




}
button4.onclick = function(event){
    clearBox();
    sortItems();
    for (i in data.items){
        if(data.categories[1].items[i] == data.items[i].id || data.categories[1].id == data.items[i].categories){
        let button = document.createElement("div");
        button.className = "category_items"
        button.innerHTML = data.items[i].title;
        document.querySelector(".Category_content").appendChild(button);
        
        let desc = document.createElement("h4");
        desc.innerHTML = data.items[i].description;
        document.querySelector(".Category_content").appendChild(desc);
        
        let long_desc = document.createElement("p");
        long_desc.innerHTML = data.items[i].long_description;
        document.querySelector(".Category_content").appendChild(long_desc);

        let img = new Image();
        img.src = data.items[i].gallery_images[0].url;
        document.querySelector(".Category_content").appendChild(img);
        
        };
}



}

}
function clearBox(){
    document.querySelector(".Category_content").innerHTML = "";
}
function sortItems(){
    data.items.sort(function(a,b){
        return a.position - b.position;
    })
    
}
