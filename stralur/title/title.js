const itemOut = document.querySelector(".timed-out");
  const timedOut = setTimeout(timeOut, 10000);
  function timeOut() {
    itemOut.classList.toggle("d-inline");
  };



const load = document.querySelector("div.load");
  const Timeout = setTimeout(loading, 8000);
  function loading() {
    load.classList.toggle("trailer-loader");
  };




/**const itemIntervalled = document.querySelector(".timed-interval");
  const itemInterval = setInterval(timeInterval, 90000);
  function timeInterval() {
    itemIntervalled.classList.toggle("d-none");
  };
**/