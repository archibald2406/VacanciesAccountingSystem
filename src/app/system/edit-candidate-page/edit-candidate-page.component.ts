import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vacancy} from "../shared/models/vacancy.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {VacanciesService} from "../shared/services/vacancies.service";
import {VacanciesStatusesService} from "../shared/services/vacancies-statuses.service";
import {mergeMap} from "rxjs/operators";
import {Candidate} from "../shared/models/candidate.model";
import {CandidatesService} from "../shared/services/candidates.service";

@Component({
  selector: 'app-edit-candidate-page',
  templateUrl: './edit-candidate-page.component.html',
  styleUrls: ['./edit-candidate-page.component.sass']
})
export class EditCandidatePageComponent implements OnInit, OnDestroy {
  candidate: Candidate;
  newCandidate: Candidate;
  vacanciesList: Vacancy[] = [];
  oldCandidateName: string;
  oldCandidateSurname: string;
  oldPositionId: string;
  vacancyName: string;

  isLoaded = false;

  s1: Subscription;
  s2: Subscription;

  constructor(private route: ActivatedRoute,
              private vacanciesService: VacanciesService,
              private vacanciesStatusesService: VacanciesStatusesService,
              private candidatesService: CandidatesService,
              private router: Router) {}

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.candidatesService.getCandidateById(params['id'])),
        mergeMap((candidate: Candidate) => {
          this.candidate = candidate;
          this.oldCandidateName = candidate.name;
          this.oldCandidateSurname = candidate.surname;
          this.oldPositionId = candidate.position;

          return this.vacanciesService.getVacanciesList();
        })
      )
      .subscribe((vacancies: Vacancy[]) => {
        for (const item of vacancies) {
          if (item._id == this.candidate.position) {
            this.vacancyName = item.name;
          }
          if (item.status === 'opened') {
            this.vacanciesList.push(item);
          }
        }

        this.isLoaded = true;
      });
  }

  onSave(form: NgForm) {
    this.newCandidate = {
      name: form.value.name,
      surname: form.value.surname,
      phone: form.value.phone,
      mail: form.value.email,
      notes: form.value.notes,
      position: this.vacancyName,
      _id: this.candidate._id
    };

    for (const item of this.vacanciesList) {
      if (item.name == this.vacancyName) {
        this.newCandidate.position = item._id;
        break;
      }
    }

    this.s2 = this.candidatesService.getCandidatesList()
      .subscribe((candidates: Candidate[]) => {
        for (const item of candidates) {
          if (item.name == this.newCandidate.name &&
            item.surname == this.newCandidate.surname &&
            (this.oldCandidateName != item.name || this.oldCandidateSurname != item.surname)
          ) {
            alert('Candidate with same name and surname already exists!');
            return;
          }
        }

        if (this.oldPositionId != this.newCandidate.position) {
          this.vacanciesService.getVacancyById(this.oldPositionId)
            .subscribe((vacancy: Vacancy) => {
              const position = vacancy.candidates.indexOf(this.newCandidate._id);

              if (position != -1) {
                vacancy.candidates.splice(position,1);
              }

              this.vacanciesService.putVacancy(vacancy)
                .subscribe(() => {});
            });

          this.vacanciesService.getVacancyById(this.newCandidate.position)
            .subscribe((vacancy: Vacancy) => {
              vacancy.candidates.push(this.newCandidate._id);
              this.vacanciesService.putVacancy(vacancy)
                .subscribe(() => {});
            });
        }

        this.candidatesService.putCandidate(this.newCandidate)
          .subscribe(() => {
            alert('Candidate successfully edited!');
            this.router.navigate(['/system/candidates']);
          });
      });
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
