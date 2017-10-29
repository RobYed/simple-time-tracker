import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
  pure: true
})
export class MonthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(month: string) {
    const date = new Date();
    date.setMonth(parseInt(month) -1);
    return date.toLocaleDateString('de-DE', { month: 'long' });
  }
}