const load = document.querySelector("div.load");
  const Timeout = setTimeout(loading, 12000);
  function loading() {
    load.classList.toggle("loader");
  };
  loading();