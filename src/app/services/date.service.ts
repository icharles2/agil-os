import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  parseDateAPI(stringDate): string {
    const dateDay = Number(stringDate.match(/\d+/)[0]);
    const arr = stringDate.split('');
    const monthStr = arr[1];
    const dateMon = new Date(Date.parse(`${monthStr}, ${dateDay}, 2019`)).getMonth() + 1;
    return `2019-${dateMon}-${dateDay}`;
  }

  parseDateLength(date1): object {
    const dateArr = date1.split('-');
    const mm = dateArr[1];
    const dd = dateArr[2];
    return { mon: mm, day: dd };
  }

  getMonthString(stringDate): object {
    const dateDay = Number(stringDate.match(/\d+/)[0]);
    const arr = stringDate.split(' ');
    const monthStr = arr[1];
    const dateMon = new Date(Date.parse(`${monthStr}, ${dateDay}, 2019`)).getMonth() + 1;
    return { mon: dateMon, day: dateDay };
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
    // this function is not returning the number expected
    // Use at Own Risk
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = this.getMonthString(tripDeparture);
    const firstDate = new Date(2019, date1['mon'], date1['day']);
    const todayDate = new Date();
    const tripCountdown = Math.round(
      Math.abs((firstDate.getTime() - todayDate.getTime()) / oneDay),
    );
    return tripCountdown;
  }
}
