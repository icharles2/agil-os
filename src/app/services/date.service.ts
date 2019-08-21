import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  dateSlice(date:string):string {
    const dateStr = date.toString();
    const index = dateStr.indexOf('2019');
    return dateStr.slice(0, index + 4);
  }

  parseDateAPI(stringDate): string {
    const dateDay = Number(stringDate.match(/\d+/)[0]);
    const arr = stringDate.split(' ');
    const monthStr = arr[1];
    const dateMon = new Date(Date.parse(`${monthStr}, ${dateDay}, 2019`)).getMonth() + 1;
    return `2019-${dateMon}-${dateDay}`;
  }

  getTripLength(date1: string, date2: string): number {
    const oneDay = 24 * 60 * 60 * 1000;
    // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const tripLength = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
    return tripLength;
  }

  getTripCountdown(tripDeparture): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(tripDeparture);
    const todayDate = new Date();
    const tripCountdown = Math.round(
      Math.abs((todayDate.getTime() - firstDate.getTime()) / oneDay),
    );
    return tripCountdown;
  }
}
