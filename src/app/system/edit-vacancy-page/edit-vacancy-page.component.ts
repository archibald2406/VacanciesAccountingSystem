import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {VacanciesService} from "../shared/services/vacancies.service";
import {mergeMap} from "rxjs/operators";
import {Vacancy} from "../shared/models/vacancy.model";
import {VacancyStatus} from "../shared/models/status.model";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {VacanciesStatusesService} from "../shared/services/vacancies-statuses.service";

@Component({
  selector: 'app-edit-vacancy-page',
  templateUrl: './edit-vacancy-page.component.html',
  styleUrls: ['./edit-vacancy-page.component.sass']
})
export class EditVacancyPageComponent implements OnInit, OnDestroy {
  vacancy: Vacancy;
  statusesList: VacancyStatus[] = [];
  formRequirements: FormGroup;
  requirements: FormArray;
  newVacancy: Vacancy;
  oldVacancyName: string;

  isLoaded = false;

  s1: Subscription;
  s2: Subscription;

  constructor(private route: ActivatedRoute,
              private vacanciesService: VacanciesService,
              private vacanciesStatusesService: VacanciesStatusesService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.vacanciesService.getVacancyById(params['id'])),
        mergeMap((vacancy: Vacancy) => {
          this.vacancy = vacancy;
          this.oldVacancyName = this.vacancy.name;
          return this.vacanciesStatusesService.getStatusesList();
        })
      )
      .subscribe((statuses: VacancyStatus[]) => {
        for (const item of statuses) {
          this.statusesList.push(item);
        }

        this.formRequirements = this.fb.group({
          requirements: new FormArray([])
        });

        this.requirements = this.formRequirements.get('requirements') as FormArray;

        for (const item of this.vacancy.requirements) {
          this.requirements.push(
            new FormGroup({
              reqName: new FormControl(item.reqName),
              isRequire: new FormControl(item.isRequire),
              isPublic: new FormControl(item.isPublic)
            })
          );
        }

        this.isLoaded = true;
      });
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
      candidates: this.vacancy.candidates,
      _id: this.vacancy._id
    };

    this.s2 = this.vacanciesService.getVacanciesList()
      .subscribe((vacancies: Vacancy[]) => {
        for (const item of vacancies) {
          if (item.name == this.newVacancy.name && this.oldVacancyName != item.name) {
            alert('Vacancy with same name already exists!');
            return;
          }
        }

        this.vacanciesService.putVacancy(this.newVacancy)
          .subscribe(() => {
            alert('Vacancy successfully edited!');
            this.router.navigate(['/system/vacancies']);
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
