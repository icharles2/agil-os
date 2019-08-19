export class Trip {
  constructor(
    public title: string,
    public destination: string,
    public origin: string,
    public quality: number,
    public transpo: string | number,
    public lodging: string | number,
    public departure: string,
    public returnDate: string,
    public rental: boolean,
    public imgUrl?: string,
    public total?: number,
  ) {}
}
