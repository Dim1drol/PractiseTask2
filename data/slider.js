var slideIndex = 1;

function plus_img(n){
  show_image(slideIndex += n);
    
}

function show_image(n) {
  let i;
  let give_images = document.getElementsByClassName("mySlides");

  if(n > give_images.lenght)
  {slideIndex == 0;
   } 
  if (n < 1){ slideIndex == give_images.lenght;
     }

  for (i = 0; i < give_images.length; i++) {
    give_images[i].style.display = "none"; 
   
  }
  give_images[slideIndex -1].style.display = "block"; 
  console.log(give_images.length);
  console.log(n);
}