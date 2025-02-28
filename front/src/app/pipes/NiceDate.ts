import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nicedate',
})
/**
 * Pipe to format a date in a human-friendly way.
 * If the date is today, it will only display the time.
 * If the date is not today, it will display the date.
 * The date is formatted according to the user's locale.
 */
export class NiceDate implements PipeTransform {
  transform(value: Date): string {
    const datePipe = new DatePipe(this.getLocale())
    const today = new Date()
    const targetDate = new Date(value)

    const areOnSameDay = this.areSameDay(today, targetDate)

    const format = areOnSameDay ? 'shortTime' : 'mediumDate'
    const prefix = areOnSameDay ? 'À ' : 'Le '
    const suffix = areOnSameDay ? ' h' : ''

    return prefix + (datePipe.transform(targetDate.toISOString(), format)
      ?? targetDate.toDateString()) + suffix
  }

  getLocale(): string {
    if (navigator.languages !== undefined)
      return navigator.languages[0]
    return navigator.language
  }

  areSameDay(d1: Date, d2: Date): boolean {
    const comparisons = [
      [d1.getMonth(), d2.getMonth()],
      [d1.getFullYear(), d2.getFullYear()],
    ]
    return d1.getDay() === d2.getDay()
      && comparisons.map(cmp => cmp[0] === cmp[1])
        .reduce((prev, curr) => prev && curr)
  }
}
