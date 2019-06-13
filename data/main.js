let data;
const getAllData = async ()  => { 
  try {
      const response = await fetch('data/test.json', {
        method: 'GET'
      })
      if (response){
        data = await response.json()
        start();
      }
  }catch (error){

      console.log('request filed', error);
  }
}



const start = () => { // переписати на стрілкові функції усі інші функції
  // якщо можна використовувати const, а не let, то варто використовувати const
  const head = document.getElementById("title");
  head.innerHTML = data.name;

  const head_desc = document.createElement("h2");
  const text = document.createTextNode(data.description);
  head_desc.appendChild(text);
  head_desc.className = "header"
  document.getElementById("Description").appendChild(head_desc);
  buttons(); // ось такі пробіли неварто робити. навіщо?
}

const buttons = () => {
  data.categories.sort((a, b) => {
    return a.positionNumber - b.positionNumber
  });

  let a = get_id =>{
    clearBox();
    sortItems();
   
  
  }
  if(data.enable_multiple_lists){
  data.categories.forEach(element => {
    let button_elements = document.createElement("button");

    button_elements.innerHTML = element.name;
    button_elements.id = element.id;


    button_elements.addEventListener("click", 
    function () { 
     clearBox();
     sortItems();
     if(element.id == data.categories[0].id ){
       get_Items(0);
     }
     if(element.id == data.categories[1].id){
      get_Items(3);
     }
     if(element.id == data.categories[2].id){
      get_Items(2);
     }
     if(element.id == data.categories[3].id){//ось тут я не зміг по іншому до того дойти, тому залишив щоб хоча би так виводило...
      get_Items(1);
     }
   })
   if(element.active == false){
    button_elements.style.display = "none";
   }
    document.querySelector(".Buttons").appendChild(button_elements);
    
    console.log(button_elements);  
      }); 
    }
    else{
      sortItems();
      get_Items(0);
      get_Items(1);
      get_Items(2);
      get_Items(3);
    }     
}


  




const clearBox =  () => {
  
  const content = document.querySelector(".Category_content")
  while (content.firstChild) {
  content.removeChild(content.firstChild);
  }
 
}

const  sortItems = () => {
  data.items.sort(function (a, b) {
  return a.position - b.position;
  })

}
const get_Items = get_id =>{
  let div = document.createElement("div");
  div.className = "div_class";
  document.querySelector(".Category_content").appendChild(div);
  data.items.forEach(element => {
    if (data.categories[get_id].element == element.id || data.categories[get_id].id == element.categories) {

      let title = document.createElement("h4");
      title.innerHTML = element.title;
      document.querySelector(".div_class").appendChild(title);

     

      let img = new Image();
      img.src = element.gallery_images[0].url;
      document.querySelector(".div_class").appendChild(img);

      let desc = document.createElement("button");
      desc.innerHTML = element.description;
      document.querySelector(".div_class").appendChild(desc);

      
        desc.addEventListener("click", function(){
        show();
        let item = document.createElement("pre");
        item.innerHTML = element.long_description;
        document.querySelector(".modal_content").appendChild(item);
      
      

       
      })
    }
  });
  let close_button = document.querySelector(".close_modal");
  close_button.addEventListener("click", close);

}
const show = () => {
  let modal = document.querySelector(".modal_window");
  modal.classList.toggle("show_modal"); // це тільки накидки модалки. 
}
const close = () => {
  let modal = document.querySelector(".modal_window").removeChild(this.modal);
  
}


document.addEventListener("DOMContentLoaded", getAllData());
