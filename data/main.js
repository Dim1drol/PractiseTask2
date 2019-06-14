let data;
const getAllData = async () => {
  try {
    const response = await fetch('data/test.json', {
      method: 'GET'
    })
    if (response) {
      data = await response.json()
      start();
    }
  } catch (error) {

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
  buttons();
}

const buttons = () => {
  data.categories.sort((a, b) => {
    return a.positionNumber - b.positionNumber
  });

  if (data.enable_multiple_lists) {
    console.log('data.categories', data.categories)
    data.categories.forEach(element => {
      let button_elements = document.createElement("button");

      button_elements.innerHTML = element.name;
      button_elements.id = element.id;
      button_elements.onclick = function () {
        get_Items(this.id);
      }
      console.log('buttons', button_elements);
      document.querySelector(".Buttons").appendChild(button_elements);

    });

  } else {
    show_all_Items();

  }
}

const clearBox = () => {

  const content = document.querySelector(".Category_content")
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

}

const sortItems = () => {
  data.items.sort(function (a, b) {
    return a.position - b.position;
  })

}
const get_Items = get_id => {
  clearBox();
  sortItems();
  let div = document.createElement("div");
  div.className = "div_class";
  document.querySelector(".Category_content").appendChild(div);

  data.items.forEach(element => {
    element.categories.forEach(category => {
      if (category == get_id) {
        let title = document.createElement("h4");
        title.innerHTML = element.title;
        document.querySelector(".div_class").appendChild(title);
        let img = new Image();

        img.src = element.gallery_images[0].url;
        document.querySelector(".div_class").appendChild(img);
        let desc = document.createElement("button");
        desc.innerHTML = element.description;
        document.querySelector(".div_class").appendChild(desc);

        desc.id = element.id;
        desc.onclick = function () {
          show_Items(this.id);
        }


      }
    })
  });

  document.querySelector(".close_modal").onclick = close;
}

const show_Items = get_item_id => {
  data.items.forEach(element => {
    if (element.id == get_item_id) {
      let item = document.createElement("pre");
      item.innerHTML = element.long_description;
      document.querySelector(".modal_content").appendChild(item);
      show();
    }
  });
}
const show = () => {
  let modal = document.querySelector(".modal_window");
  modal.classList.toggle("show_modal");
}
const close = () => {
  let modal = document.querySelector(".modal_window");
  modal.style



}
const show_all_Items = () => {
  sortItems();
  let div = document.createElement("div");
  div.className = "div_class";
  document.querySelector(".Category_content").appendChild(div);

  data.items.forEach(element => {
    let title = document.createElement("h4");
    title.innerHTML = element.title;
    document.querySelector(".div_class").appendChild(title);

    let img = new Image();
    img.src = element.gallery_images[0].url;
    document.querySelector(".div_class").appendChild(img);

    let desc = document.createElement("button");
    desc.innerHTML = element.description;
    document.querySelector(".div_class").appendChild(desc);

    desc.id = element.id;
    desc.onclick = function () {
      show_Items(this.id);
    }

  });
}



document.addEventListener("DOMContentLoaded", getAllData());