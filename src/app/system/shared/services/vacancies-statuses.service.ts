import { Injectable } from '@angular/core';
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VacanciesStatusesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getStatusesList() {
    return this.get('vacanciesStatuses');
  }
}
