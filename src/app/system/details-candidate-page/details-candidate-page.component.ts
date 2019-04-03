import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vacancy} from "../shared/models/vacancy.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {VacanciesService} from "../shared/services/vacancies.service";
import {mergeMap} from "rxjs/operators";
import {Candidate} from "../shared/models/candidate.model";
import {CandidatesService} from "../shared/services/candidates.service";

@Component({
  selector: 'app-details-candidate-page',
  templateUrl: './details-candidate-page.component.html',
  styleUrls: ['./details-candidate-page.component.sass']
})
export class DetailsCandidatePageComponent implements OnInit, OnDestroy {
  candidate: Candidate;
  positionName: string;
  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private candidatesService: CandidatesService,
              private vacanciesService: VacanciesService) {}

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(
        mergeMap((params: Params) => {
          return this.candidatesService.getCandidateById(params['id']);
        })
      )
      .subscribe((candidate: Candidate) => {
        this.candidate = candidate;

        this.vacanciesService.getVacancyById(candidate.position)
          .subscribe((vacancy: Vacancy) => {
            this.positionName = vacancy.name;

            this.isLoaded = true;
          });
      });
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
