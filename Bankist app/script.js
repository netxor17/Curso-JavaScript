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


const botonScrollTo = document.querySelector('.btn--scroll-to');

//seccion a la que quiero bajar
const section1 = document.querySelector('.section__header');

botonScrollTo.addEventListener('click',function(e){
  /*Manera mas moderna para navegadores modernos, 
  lo comentado arriba tambien sirve, 
  pero es mas rudimentario*/
  section1.scrollIntoView({behavior:'smooth'});

});


///////////////////////////Navegacion dentro de la pagina

// const links = document.querySelectorAll('.nav__link');

// //console.log(links);

// links.forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault(); //no se va a ninguno por defecto
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// });

//hay que usar event delegation para que no haya una copia de la funcion 
//en cada elemento del nodelist recogido al hacer el querySelectorAll


////////////////////////////////Event delegation

// const linksDelegation = document.querySelector('.nav__links').addEventListener('click',function(e){
//   e.preventDefault();
//   console.log(e.target);
//   //comparar si lo que he pulsado es lo que queria
//   if(e.target.classList.contains('nav__link')){
//     console.log('link');
//     const id = e.target.getAttribute('href');//el target es donde clico
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   }
// });


//Caminar por el DOM

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// //de arriba a abajo

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';
// h1.closest('.header').style.background = 'orange';

// h1.closest('h1').style.background = 'blue';


//Tabbed component

console.clear();

// const tabs = document.querySelectorAll('.operations__tab');

// const tabContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelector('.operations__content');

// tabContainer.addEventListener('click',function(e){
//   e.preventDefault();
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);
//   //Me aseguro que clico en el boton
//   if(!clicked) return;
//   //Activo el tab
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   clicked.classList.add('operations__tab--active');
//   //Activamos la seccion elegida
//   const tabClick = clicked.dataset.tab;
//   console.log(tabClick);
//   document.querySelector(`.operations__content--${tabClick}`).classList.add('.operations__content--active');
// });


/****************  Resaltar algo cuando paso por encima y hacer borroso lo demas */
// nav.addEventListener('mouseover',function(e){
//   if(e.target.classList.contains('nav__link')){
//     const clicked = e.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');
//     siblings.forEach(element => {
//       if (element !== clicked) {
//         element.style.opacity = 0.5;
//       }
//     });
//     logo.style.opacity = 0.5;
//   }
// });

//  nav.addEventListener('mouseout',function(e){
//   if(e.target.classList.contains('nav__link')){
//     const clicked = e.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');
//     siblings.forEach(element => {
//       if (element !== clicked) {
//         element.style.opacity = 1;
//       }
//     });
//     logo.style.opacity = 1;
//   }
// });


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

const h1coords = h1.getBoundingClientRect();

//Intersection observer API
//Nos deja observar cambios cada vez que un elemento aparece en el viewport

// const observerCallback = function(entries,observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };


// const obsOptions = {
//   root: null,
//   threshold: [0,0.2] //cantidad de la seccion en la interseccion
// };

// const observer = new IntersectionObserver(observerCallback,obsOptions);

// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  //console.log(entry);
  if(!entry.isIntersecting)
  nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

;

const options = {
  root: null, //null es para el viewport del navegador
  threshold: 0, //cuando no se vea nada
  rootMargin:  `-${navHeight}px`
};
const headerObserver = new IntersectionObserver(stickyNav,options);

headerObserver.observe(header);


//revelar secciones a medida que bajamos 
//el proposito de esto es que a medida que bajemos, quitemos de cada seccion 
//el section--hidden que tiene
//usaremos intersection observer API


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


/**********************Slider ********************/

// const slides = document.querySelectorAll('slide')

// slides.forEach((s,i) => s.style.transform = `translateX(${100*i}%))`);
