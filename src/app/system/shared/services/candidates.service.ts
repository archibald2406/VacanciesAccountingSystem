import { Injectable } from '@angular/core';
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {Candidate} from "../models/candidate.model";

@Injectable()
export class CandidatesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getCandidatesList() {
    return this.get('candidates');
  }

  getCandidateById(id: string) {
    return this.get(`candidates/${id}`);
  }

  putCandidate(candidate: Candidate) {
    return this.put(`candidates/${candidate._id}`,candidate);
  }

  createNewCandidate(candidate: Candidate) {
    return this.post('candidates', candidate);
  }

  deleteCandidate(id: string) {
    return this.delete(`candidates/${id}`);
  }
}
