'use strict'

const top = document.querySelector('.elementor-element-9a1c492');

document.addEventListener('DOMContentLoaded', function() {
    console.log(top)
});

const stickyNav = function(entries){
    const [entry] = entries;
    console.log(entry);
    if(!entry.isIntersecting)
    top.classList.add('sticky');
    else top.classList.remove('sticky');
  };
  
  const options = {
    root: null, //null es para el viewport del navegador
    threshold: 0, //cuando no se vea nada
    rootMargin:  '-90px'
  };
  
  const headerObserver = new IntersectionObserver(stickyNav,options);
  
  headerObserver.observe(top);