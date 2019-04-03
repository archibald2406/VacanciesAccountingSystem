import {VacancyRequirement} from "./requirement.model";

export class Vacancy {
  constructor(
    public name: string,
    public status: string,
    public description: string,
    public requirements: VacancyRequirement[],
    public candidates: string[] = [],
    public _id?: string
  ) {}
}
