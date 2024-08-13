const config = {
  speed: 750,
  allowTouchMove: false,
  slidesPerView: "auto",
  slidesPerGroup: 6,
  maxBackfaceHiddenSlides: 6 + 2,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev' } };


let swiper = new Swiper('.swiper', config);
let delay = setTimeout(() => {}, 100);

const sleep = ms => new Promise(r => setTimeout(r, ms));

$(".item").on("mouseover", function () {
  let that = $(this);
  let active = false;
  let offset = that.offset();
  let size = {
    height: that.height(),
    width: that.width() };


  $(".card").removeClass("card--active");

  clearTimeout(delay);
  delay = setTimeout(async function () {
    $(".card").find("img").attr("src", that.find("img").attr("src"));
    $(".card").css({
      "--scale": ".66",
      width: size.width * 1.5,
      left: offset.left - (size.width * 1.5 - size.width) / 2,
      top: offset.top });

    await sleep(600);

    $(".card").
    addClass("card--active").
    css({
      "--translateY": `-${size.width * .2}px`,
      "--scale": "1",
      width: size.width * 1.5 });

  }, 400);
}).on("mouseout", async function () {
  clearTimeout(delay);
});
$(".card").on("mouseout", async function () {
  await sleep(50);
  $(this).css({
    "--scale": ".66",
    "--translateY": "0px" });

  await sleep(100);
  $(this).removeClass("card--active");
});