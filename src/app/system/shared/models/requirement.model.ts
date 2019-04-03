export class VacancyRequirement {
  constructor(
    public reqName: string,
    public isRequire: boolean,
    public isPublic: boolean,
    public _id?: number
  ) {}
}
