import { animate, stagger, style } from '@angular/animations';

export const staggeredSlideIn = [
  style({ opacity: 0, transform: `translateY(-50px)` }),
  stagger(30, [
    animate('250ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({ opacity: '*', transform: '*' })),
  ]),
];
