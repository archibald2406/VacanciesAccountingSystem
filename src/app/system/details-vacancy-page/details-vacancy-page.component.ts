import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {VacanciesService} from "../shared/services/vacancies.service";
import {mergeMap} from "rxjs/operators";
import {Vacancy} from "../shared/models/vacancy.model";
import {CandidatesService} from "../shared/services/candidates.service";
import {Candidate} from "../shared/models/candidate.model";

@Component({
  selector: 'app-details-vacancy-page',
  templateUrl: './details-vacancy-page.component.html',
  styleUrls: ['./details-vacancy-page.component.sass']
})
export class DetailsVacancyPageComponent implements OnInit, OnDestroy {
  vacancy: Vacancy;
  candidatesList: string[] = [];
  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private vacanciesService: VacanciesService,
              private candidatesService: CandidatesService) {}

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(
        mergeMap((params: Params) => {
          return this.vacanciesService.getVacancyById(params['id']);
        })
      )
      .subscribe((vacancy: Vacancy) => {
        this.vacancy = vacancy;

        this.candidatesService.getCandidatesList()
          .subscribe((candidates: Candidate[]) => {
            for (const candidate of candidates) {
              if (candidate.position == this.vacancy._id) {
                this.candidatesList.push(`${candidate.name} ${candidate.surname}`);
              }
            }

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
