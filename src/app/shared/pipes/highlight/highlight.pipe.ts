import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, term: string): string {
    return term
      ? value.toString().replace(new RegExp(term, 'gi'), val => '<mark>' + val + '</mark>')
      : value;
  }
}
