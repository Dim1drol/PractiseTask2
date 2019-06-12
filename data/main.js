let data;

const getAllData = () => { // переписати на стрілкові функції усі інші функції
  fetch('data/test.json', {
      method: 'GET'

    })
    .then(response => { // переписати на стрілкові функції усі інші функції
      if (response.status !== 200) {
        alert("ERROR");
        return;
      }
      response.json()
        .then(AllData => { // переписати на стрілкові функції усі інші функції
          data = AllData;
          start();
        });
    })
    .catch(error => { // переписати на стрілкові функції усі інші функції
      console.log('request filed', error);
    });
}

document.addEventListener("DOMContentLoaded", getAllData());

const start = () => { // переписати на стрілкові функції усі інші функції
  // якщо можна використовувати const, а не let, то варто використовувати const
  let head = document.getElementById("title");
  head.innerHTML = data.name;

  let head_desc = document.createElement("h2");
  let text = document.createTextNode(data.description);
  head_desc.appendChild(text);
  head_desc.className = "header"
  document.getElementById("Description").appendChild(head_desc);
  buttons();
  // ось такі пробіли неварто робити. навіщо?


}

const buttons = () => {
  data.categories.sort((a, b) => {
    return a.positionNumber - b.positionNumber
  });

  // це має бути цикл
  let button1 = document.createElement("button");
  button1.innerHTML = data.categories[0].name;
  button1.id = data.categories[0].id;
  document.querySelector(".Buttons").appendChild(button1);


  let button2 = document.createElement("button");
  button2.innerHTML = data.categories[1].name;
  document.querySelector(".Buttons").appendChild(button2);

  let button3 = document.createElement("button");
  button3.innerHTML = data.categories[2].name;
  document.querySelector(".Buttons").appendChild(button3);

  let button4 = document.createElement("button");
  button4.innerHTML = data.categories[3].name;
  document.querySelector(".Buttons").appendChild(button4); // тут кінець цикла. 
  // якщо я зроблю 100500 елементів у json, це все піде до сраки

  button1.onclick = function (event) { // event ніде не використовується. навіщо його приймати?
    clearBox();
    sortItems();
    for (i in data.items) { // настав час вчити цикли map та forEach. в нас JS а не С#
      if (data.categories[0].items[i] == data.items[i].id || data.categories[0].id == data.items[i].categories) {

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

        // навіщо така конструкція?
        // let img = new Image();
        // img.src = data.items[i].gallery_images[0].url; 
        // =>
        const img = data.items[i].gallery_images[0].url;
        document.querySelector(".Category_content").appendChild(img);

      }
    };
  }
  button2.onclick = function (event) {
    clearBox();
    sortItems();
    for (i in data.items) {
      if (data.categories[3].items[i] == data.items[i].id || data.categories[3].id == data.items[i].categories) {
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
  button3.onclick = function (event) {
    clearBox();
    sortItems();
    for (i in data.items) {
      if (data.categories[2].items[i] == data.items[i].id || data.categories[2].id == data.items[i].categories) {
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
  button4.onclick = function (event) {
    clearBox();
    sortItems();
    for (i in data.items) {
      if (data.categories[1].items[i] == data.items[i].id || data.categories[1].id == data.items[i].categories) {
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

// button 1-4 зробити в один обробник. 100500 рядків коду дублювати не потрібно

function clearBox() {
  // document.querySelector(".Category_content").innerHTML = ""; => я казав не юзати .innerHTML = ""
  const content = document.querySelector(".Category_content")
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  // почитати про "мандрівки по HTML елементах"
  // якщо нема поняття що це, сказати, скину посилання
}

// ідентичну функцію бачив вище. дублювання не потрібне
function sortItems() {
  data.items.sort(function (a, b) {
    return a.position - b.position;
  })

}

// юзати 2 spaces, а не 4 і не Tabs...
// функції забрати. використовувати стрілкові.
// спробувати переписати з промісів на try...catch
//  if const => use const, else let 
// поправити ентери у коді. читабельність коду і його вигляд, теж важлива річ
// виправити все, до чого я докопався і відправити на мене пул реквест для мерджу у мастер.
// якщо будуть питання по пул реквесту / мерджу => запитатись мене