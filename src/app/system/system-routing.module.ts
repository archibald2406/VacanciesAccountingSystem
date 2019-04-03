import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {VacanciesPageComponent} from "./vacancies-page/vacancies-page.component";
import {CreateVacancyPageComponent} from "./create-vacancy-page/create-vacancy-page.component";
import {DetailsVacancyPageComponent} from "./details-vacancy-page/details-vacancy-page.component";
import {EditVacancyPageComponent} from "./edit-vacancy-page/edit-vacancy-page.component";
import {CandidatesPageComponent} from "./candidates-page/candidates-page.component";
import {CreateCandidatePageComponent} from "./create-candidate-page/create-candidate-page.component";
import {DetailsCandidatePageComponent} from "./details-candidate-page/details-candidate-page.component";
import {EditCandidatePageComponent} from "./edit-candidate-page/edit-candidate-page.component";

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'vacancies', component: VacanciesPageComponent},
      {path: 'create-vacancy', component: CreateVacancyPageComponent},
      {path: 'vacancy-detail/:id', component: DetailsVacancyPageComponent},
      {path: 'edit-vacancy/:id', component: EditVacancyPageComponent},
      {path: 'candidates', component: CandidatesPageComponent},
      {path: 'create-candidate', component: CreateCandidatePageComponent},
      {path: 'candidate-detail/:id', component: DetailsCandidatePageComponent},
      {path: 'edit-candidate/:id', component: EditCandidatePageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
