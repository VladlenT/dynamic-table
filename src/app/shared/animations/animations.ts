import { animate, stagger, style } from '@angular/animations';

export const staggeredSlideIn = ({ initTranslate, staggerTime, animation }) => [
  style({ opacity: 0, transform: `translateY(${initTranslate})`, height: 0 }),
  stagger(staggerTime, [animate(animation, style({ opacity: '*', transform: '*', height: '*' }))]),
];
