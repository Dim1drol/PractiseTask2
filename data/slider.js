var slideIndex = 1;

function plus_img(n) {
  show_image(slideIndex += n);

}

function show_image(n) {
  let i;
  let give_images = document.getElementsByClassName("mySlides");

  if (n > give_images.length) {
    // в тебе було lenght а не length
    slideIndex = 1;
    // було slideIndex == 1 ти порівнював, а не присвоював
  }
  if (n < 1) {
    // в тебе було lenght а не length
    slideIndex = give_images.length;
    // було slideIndex == give_images.length ти порівнював, а не присвоював
  }

  for (i = 0; i < give_images.length; i++) {
    give_images[i].style.display = "none";

  }
  give_images[slideIndex - 1].style.display = "block";
}