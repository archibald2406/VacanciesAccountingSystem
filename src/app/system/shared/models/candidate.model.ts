export class Candidate {
  constructor(
    public name: string,
    public surname: string,
    public position: string,
    public phone: string,
    public mail: string,
    public notes: string,
    public _id?: string
  ) {}
}
