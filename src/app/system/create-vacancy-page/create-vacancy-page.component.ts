import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {Vacancy} from "../shared/models/vacancy.model";
import {VacancyStatus} from "../shared/models/status.model";
import {VacanciesStatusesService} from "../shared/services/vacancies-statuses.service";
import {Subscription} from "rxjs";
import {VacanciesService} from "../shared/services/vacancies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-vacancy-page',
  templateUrl: './create-vacancy-page.component.html',
  styleUrls: ['./create-vacancy-page.component.sass']
})
export class CreateVacancyPageComponent implements OnInit, OnDestroy {
  statusesList: VacancyStatus[] = [];
  formRequirements: FormGroup;
  requirements: FormArray;
  newVacancy: Vacancy;

  isLoaded = false;

  sub1: Subscription;
  sub2: Subscription;

  constructor(private vacanciesService: VacanciesService,
              private vacanciesStatusesService: VacanciesStatusesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.sub1 = this.vacanciesStatusesService.getStatusesList()
      .subscribe((statuses: VacancyStatus[]) => {
        for (const item of statuses) {
          this.statusesList.push(item);
        }
      });

    this.formRequirements = this.fb.group({
      requirements: new FormArray([])
    });

    this.isLoaded = true;
  }

  addRequirement() {
    this.requirements = this.formRequirements.get('requirements') as FormArray;
    this.requirements.push(
      new FormGroup({
        reqName: new FormControl(''),
        isRequire: new FormControl(false),
        isPublic: new FormControl(false)
      })
    );
  }

  removeRequirement(index: number) {
    this.requirements = this.formRequirements.get('requirements') as FormArray;
    this.requirements.removeAt(index);
  }

  onSave(form: NgForm) {
    this.newVacancy = {
      name: form.value.name,
      status: form.value.status,
      description: form.value.description,
      requirements: this.formRequirements.get('requirements').value,
      candidates: []
    };

    if (!this.newVacancy.status) {
      this.newVacancy.status = 'opened';
    }

    this.sub2 = this.vacanciesService.getVacanciesList()
      .subscribe((vacancies: Vacancy[]) => {
        for (const item of vacancies) {
          if (item.name == this.newVacancy.name) {
            alert('Vacancy with same name already exists!');
            return;
          }
        }

        this.vacanciesService.createNewVacancy(this.newVacancy)
          .subscribe(() => {
            alert('New vacancy successfully added!');
            this.router.navigate(['/system/vacancies']);
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
