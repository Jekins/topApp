export class Filter {

  constructor(
	public years?: string[],
	public genres?: string[],
    public rating?: number,
    public sorts?: string,
    public quality?: boolean,
  ) {  }

}
