const imgs = [
  "0.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];

const jumboImg = imgs[Math.floor(Math.random() * imgs.length)];
const tempImg = `<img src="static/img/${jumboImg}" class="card-img-top mb-3" />`;
$(".jumbotron").prepend(tempImg);
