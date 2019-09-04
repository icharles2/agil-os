export class Lifecycle {
  constructor(
    public isDoneLoading: boolean,
    public lodging: boolean,
    public food: boolean,
    public flight1: boolean,
    public transpo: boolean,
    public rental: boolean,
    public tripLength?: number,
    public distance?: string,
    public wasSaved?: boolean,
  ) {}
}
