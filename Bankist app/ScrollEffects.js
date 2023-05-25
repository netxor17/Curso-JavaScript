'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');
const header = document.querySelector('.header')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//////////////// Para bajar directamente a algun sitio si le doy a un enlace ////////////////////////

const botonScrollTo = document.querySelector('.btn--scroll-to');

//seccion a la que quiero bajar
const section1 = document.querySelector('.section__header');

botonScrollTo.addEventListener('click',function(e){
  /*Manera mas moderna para navegadores modernos, 
  lo comentado arriba tambien sirve, 
  pero es mas rudimentario*/
  section1.scrollIntoView({behavior:'smooth'});

});

///////////////////// Para cambiar la opacidad si estoy encima de un elemento ///////////////////

const handleHover = function(e,opacity){
    if(e.target.classList.contains('nav__link')){
      const clicked = e.target;
      const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
      const logo = clicked.closest('.nav').querySelector('img');
      siblings.forEach(element => {
        if (element !== clicked) {
          element.style.opacity = opacity;
        }
      });
      logo.style.opacity = opacity;
    }
  }
  
  nav.addEventListener('mouseover',function(e){
    handleHover(e,0.5);
  });
  
  nav.addEventListener('mouseout',function(e){
    handleHover(e,1);
  });
  
  //const h1coords = h1.getBoundingClientRect();


//////////////// Para hacer un sticky navigator usando IntersectionObserver ////////////////////////////////////
 
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting)
  nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const options = {
  root: null, //null es para el viewport del navegador
  threshold: 0, //cuando no se vea nada
  rootMargin:  `-${navHeight}px`
};

const headerObserver = new IntersectionObserver(stickyNav,options);

headerObserver.observe(header);


//////////////////// Revelar secciones con IntersectionObserver ///////////////////////


const allSections = document.querySelectorAll('.section');

const revelarSeccion = function(entries, observer){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revelarSeccion,{
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden'); //añadimos mediante javascript un section hidden a todas las sections
})


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

