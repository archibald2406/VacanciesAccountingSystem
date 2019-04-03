import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Candidate} from "../shared/models/candidate.model";
import {CandidatesService} from "../shared/services/candidates.service";
import {VacanciesService} from "../shared/services/vacancies.service";
import {Vacancy} from "../shared/models/vacancy.model";

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.sass']
})
export class CandidatesPageComponent implements OnInit, OnDestroy {
  candidatesList: Candidate[];
  vacanciesList: Vacancy[];
  positionsNames: string[] = [];

  isLoaded = false;
  s1: Subscription;
  s2: Subscription;

  constructor(private candidatesService: CandidatesService,
              private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.s1 = this.candidatesService.getCandidatesList()
      .subscribe((candidates: Candidate[]) => {
        this.candidatesList = candidates;

        this.refreshVacanciesNames();
      });
  }

  refreshVacanciesNames() {
    this.positionsNames = [];

    this.vacanciesService.getVacanciesList()
      .subscribe((vacancies: Vacancy[]) => {
        this.vacanciesList = vacancies;

        for (const candidate of this.candidatesList) {
          for (const vacancy of this.vacanciesList) {
            if (candidate.position == vacancy._id) {
              this.positionsNames.push(vacancy.name);
            }
          }
        }

        this.isLoaded = true;
      });
  }

  removeVacancy(id: string) {
    if (confirm('Are sure to remove this candidate?')) {
      this.s2 = this.candidatesService.deleteCandidate(id)
        .subscribe((candidate: Candidate) => {

          this.vacanciesService.getVacancyById(candidate.position)
            .subscribe((vacancy: Vacancy) => {
              const position = vacancy.candidates.indexOf(id);

              if (position != -1) {
                vacancy.candidates.splice(position,1);
              }

              this.vacanciesService.putVacancy(vacancy)
                .subscribe(() => {
                  alert('Candidate successfully removed!');
                  this.isLoaded = false;
                  this.candidatesService.getCandidatesList()
                    .subscribe((candidates: Candidate[]) => {
                      this.candidatesList = candidates;

                      this.refreshVacanciesNames();
                    });
                });
            });
        });
    }
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
    if (this.s2) {
      this.s2.unsubscribe();
    }
  }
}
