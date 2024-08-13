(function() {
  "use strict";

  const searchContainer = document.querySelector('.search-container');
  const searchContainer1 = document.querySelector('.search-container-1');

  const searchIcon = document.getElementById('buttonIcon');
  const searchIcon1 = document.getElementById('buttonIcon1');

  const searchIcon2 = document.querySelector('.search-icon');
  const searchIcon3 = document.querySelector('.search-icon-1');

  const searchHider = document.querySelector('.search-hide');
  const searchHider1 = document.querySelector('.search-hide-1');

  function showSearch() {
    searchContainer.classList.toggle("d-none");
    searchIcon2.classList.toggle("d-none")
  }

  function hideSearch() {
    searchContainer.classList.toggle("d-none");
    searchIcon2.classList.toggle("d-none");
  }

  function showSearch1() {
    searchContainer1.classList.toggle("d-none");
    searchIcon3.classList.toggle("d-none")
  }

  function hideSearch1() {
    searchContainer1.classList.toggle("d-none");
    searchIcon3.classList.toggle("d-none");
  }

  searchIcon.addEventListener('click', showSearch);
  searchHider.addEventListener('click', hideSearch);

  searchIcon1.addEventListener('click', showSearch1);
  searchHider1.addEventListener('click', hideSearch1);


  /*function getCookie(username){
  if (document.cookie.length>0){
    username_start=document.cookie.indexOf(username + "=");
    if (username_start!=-1){
      username_start=username_start + username.length+1;
      username_end=document.cookie.indexOf(";",username_start);
      if (username_end==-1) username_end=document.cookie.length;
      return unescape(document.cookie.substring(username_start,username_end));
      }
    }
  return "";
  }
  function setCookie(username,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=username+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
  }
  function checkCookie(){
  username=getCookie('username');
  if (username!=null && username!=""){
    greetUser.innerHTML = "Hi, "+username+'!';
    }
    else {
    username = document.querySelector('input.usernameInput').value;
    if (username!=null && username!=""){
      setCookie('username',username,365);
      }
    }
  }
  const greetUser = document.getElementById('greeting');

  */




  function copyright() {
    document.querySelector("p.copyright").innerHTML = "&copy; Stralur, Inc 2022 - 2023";
  };




})();