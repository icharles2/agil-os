export class DBTrip {
  constructor(
    public id: number,
    public name: string,
    public departureDate: string,
    public arrivalDate: string,
    public origin: string,
    public destination: string,
    public pic: string,
    public isRental: boolean,
    public total: string,
    public user: {},
    public quality: {},
    public lodging: {},
    public transportation: {},
    public price: any,
    public cars: any,
  ) {}
}
