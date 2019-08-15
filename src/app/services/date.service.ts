import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  constructor() { }

  parseDateAPI(date1):string {
    const yyyy = new Date().getFullYear();
    const dateArr = date1.split('/');
    const mm = dateArr[0];
    const dd = dateArr[1];
    return `${yyyy}-${mm}-${dd}`;
  }

  parseDateLength(date1):object {
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

  getTripLength(date1:string, date2:string): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateA = this.parseDateLength(date1);
    const dateB = this.parseDateLength(date2);
     // hours*minutes*seconds*milliseconds
    const firstDate = new Date(2019, dateA['mon'], dateB['day']);
    const secondDate = new Date(2019, dateA['mon'], dateB['day']);
    const tripLength = Math.round(
      Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)),
      );
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
      Math.abs((firstDate.getTime() - todayDate.getTime()) / (oneDay)),
      );
    return tripCountdown;
  }
}
