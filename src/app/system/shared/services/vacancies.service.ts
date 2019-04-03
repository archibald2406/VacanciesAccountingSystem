import { Injectable } from '@angular/core';
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {Vacancy} from "../models/vacancy.model";

@Injectable()
export class VacanciesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getVacanciesList() {
    return this.get('vacancies');
  }

  getVacancyById(id: string) {
    return this.get(`vacancies/${id}`);
  }

  putVacancy(vac: Vacancy) {
    return this.put(`vacancies/${vac._id}`,vac);
  }

  createNewVacancy(vacancy: Vacancy) {
    return this.post('vacancies', vacancy);
  }

  deleteVacancy(id: string) {
    return this.delete(`vacancies/${id}`);
  }
}
