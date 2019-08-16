export class Trip {
  constructor(
    public title: string,
    public destination: string,
    public origin: string,
    public quality: number,
    public transpo: string,
    public lodging: string,
    public departure: string,
    public returnDate: string,
    public rental: boolean,
    public imgUrl?: string,
    public total?: number,
  ) {}
}
