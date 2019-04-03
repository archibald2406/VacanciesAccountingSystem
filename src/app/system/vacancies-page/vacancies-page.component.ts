import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Vacancy} from "../shared/models/vacancy.model";
import {VacanciesService} from "../shared/services/vacancies.service";

@Component({
  selector: 'app-vacancies-page',
  templateUrl: './vacancies-page.component.html',
  styleUrls: ['./vacancies-page.component.sass']
})
export class VacanciesPageComponent implements OnInit, OnDestroy {
  vacanciesList: Vacancy[];

  isLoaded = false;
  s1: Subscription;
  s2: Subscription;

  constructor(private route: ActivatedRoute,
              private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.s1 = this.vacanciesService.getVacanciesList()
      .subscribe((vacancies: Vacancy[]) => {
        this.vacanciesList = vacancies;

        this.isLoaded = true;
      });
  }

  removeVacancy(id: string) {
    this.s2 = this.vacanciesService.getVacancyById(id)
      .subscribe((vacancy: Vacancy) => {
        if (vacancy.candidates.length) {
          alert('You can\'t remove this vacancy, because there are candidates.');
          return;
        }

        if (confirm('Are sure to remove this vacancy?')) {
          this.vacanciesService.deleteVacancy(id)
            .subscribe(() => {
              alert('Vacancy successfully removed!');
              this.vacanciesService.getVacanciesList()
                .subscribe((vacancies: Vacancy[]) => {
                  this.vacanciesList = vacancies;
                });
            });
        }
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
