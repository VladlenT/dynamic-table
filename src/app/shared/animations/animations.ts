import { animate, stagger, style } from '@angular/animations';

export function staggeredSlideIn({ initTranslate, staggerTime, animation }) {
  return [
    style({ opacity: 0, transform: `translateY(${initTranslate})` }),
    stagger(staggerTime, [animate(animation, style({ opacity: '*', transform: '*' }))]),
  ];
}
