import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Vacancy} from "../shared/models/vacancy.model";
import {Subscription} from "rxjs";
import {VacanciesService} from "../shared/services/vacancies.service";
import {Router} from "@angular/router";
import {Candidate} from "../shared/models/candidate.model";
import {CandidatesService} from "../shared/services/candidates.service";

@Component({
  selector: 'app-create-candidate-page',
  templateUrl: './create-candidate-page.component.html',
  styleUrls: ['./create-candidate-page.component.sass']
})
export class CreateCandidatePageComponent implements OnInit, OnDestroy {
  vacanciesList: Vacancy[] = [];
  newCandidate: Candidate;

  isLoaded = false;

  sub1: Subscription;
  sub2: Subscription;

  constructor(private vacanciesService: VacanciesService,
              private router: Router,
              private candidatesService: CandidatesService) { }

  ngOnInit() {
    this.sub1 = this.vacanciesService.getVacanciesList()
      .subscribe((vacancies: Vacancy[]) => {
        for (const item of vacancies) {
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
      position: form.value.position
    };

    if (!this.newCandidate.position) {
      alert('You should choose vacancy!');
      return;
    }

    for (const item of this.vacanciesList) {
      if (item.name === this.newCandidate.position) {
        this.newCandidate.position = item._id;
        break;
      }
    }

    this.sub2 = this.candidatesService.getCandidatesList()
      .subscribe((candidates: Candidate[]) => {
        for (const item of candidates) {
          if (item.name === this.newCandidate.name && item.surname === this.newCandidate.surname) {
            alert('Candidate with same name and surname already exists!');
            return;
          }
        }

        this.candidatesService.createNewCandidate(this.newCandidate)
          .subscribe((candidate: Candidate) => {
            this.vacanciesService.getVacancyById(this.newCandidate.position)
              .subscribe((vacancy: Vacancy) => {
                vacancy.candidates.push(candidate._id);
                this.vacanciesService.putVacancy(vacancy)
                  .subscribe(() => {});
              });

            alert('New candidate successfully added!');
            this.router.navigate(['/system/candidates']);
          });
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
