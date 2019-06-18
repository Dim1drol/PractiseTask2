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

  const head_desc = document.createElement("p");
  const text = document.createTextNode(data.description);
  head_desc.appendChild(text);
  head_desc.className = "header"
  document.getElementById("desc").appendChild(head_desc);
  buttons();

  let link = document.createElement('link');
	link.setAttribute("rel", "shortcut icon");
	link.setAttribute("type", "image/png");
	link.href = data.icon.file.url;
	document.getElementsByTagName('head')[0].append(link);
  
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
      if(!element.active){
        button_elements.style.display = "none";
      }

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
        let title = document.createElement("p");
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
        document.querySelector(".close_modal").onclick = close;

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
     
      
      


      let slider = document.createElement("div")
      slider.className = "slider";
      document.querySelector(".modal_content").appendChild(slider);
    
      element.gallery_images.forEach(one_image => {
        let img = document.createElement("img");
        img.classList.add("mySlides");
        let imgURL = one_image.url;
        img.setAttribute('src', imgURL);
        slider.appendChild(img);
      
      });  
      let right_click = document.createElement("span");
      right_click.innerHTML = "&#10094;";
      right_click.onclick = function () {
        plus_img(1)
      }
      slider.appendChild(right_click);
      

      let left_click = document.createElement("span");
      left_click.innerHTML = "&#10095;";
      left_click.onclick = function() {
        plus_img(-1);
        }
      slider.appendChild(left_click);
      
      let video = document.createElement("div")
      video.className = "video";
      document.querySelector(".modal_content").appendChild(video);

      if (element.videoUrl != null){
        let title = document.createElement("p");
        title.className = "video_title";
        title.innerHTML = element.videoTitle;
       

        let video_content = document.createElement("iframe");
        video_content.src = getFrame(element.videoUrl);
        video_content.className = "video_content";
        video_content.setAttribute('frameborder', "0");
        video_content.setAttribute('allowfullscreen', "");
        video.appendChild(title);
        video.appendChild(video_content);
      }
      show_image(1);
      
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

  const content = document.querySelector(".modal_content")
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  modal.classList.toggle("closed_modal");
  modal.classList.remove("closed_modal");
  modal.classList.remove("show_modal");
}
const window_click = event =>{
  const modal = document.querySelector(".modal_window");
  if(event.target === modal){
    close();
  }
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
function getFrame(url){
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return "//www.youtube.com/embed/" + match[2];
	} else {
		return 'error';
	}
}





window.addEventListener("click", window_click);
document.addEventListener("DOMContentLoaded", getAllData());