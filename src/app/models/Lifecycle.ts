export class Lifecycle {
  constructor(
    public isDoneLoading: boolean,
    public lodging: boolean,
    public food: boolean,
    public transpo: boolean,
    public tripLength?: number,
    public distance?: string,
  ) {}
}
