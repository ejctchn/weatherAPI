import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js';
 
gsap.set('.cursor',{xPercent:-50, yPercent: -50});
let cursor = document.querySelector('.cursor');
let title = document.querySelector('h1');

let mouseX;
let mouseY;