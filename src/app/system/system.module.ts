import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import { VacanciesPageComponent } from './vacancies-page/vacancies-page.component';
import {VacanciesService} from "./shared/services/vacancies.service";
import { CreateVacancyPageComponent } from './create-vacancy-page/create-vacancy-page.component';
import {VacanciesStatusesService} from "./shared/services/vacancies-statuses.service";
import { DetailsVacancyPageComponent } from './details-vacancy-page/details-vacancy-page.component';
import { EditVacancyPageComponent } from './edit-vacancy-page/edit-vacancy-page.component';
import { CandidatesPageComponent } from './candidates-page/candidates-page.component';
import {CandidatesService} from "./shared/services/candidates.service";
import { CreateCandidatePageComponent } from './create-candidate-page/create-candidate-page.component';
import { DetailsCandidatePageComponent } from './details-candidate-page/details-candidate-page.component';
import { EditCandidatePageComponent } from './edit-candidate-page/edit-candidate-page.component';

@NgModule({
  declarations: [
    SystemComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    VacanciesPageComponent,
    CreateVacancyPageComponent,
    DetailsVacancyPageComponent,
    EditVacancyPageComponent,
    CandidatesPageComponent,
    CreateCandidatePageComponent,
    DetailsCandidatePageComponent,
    EditCandidatePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
  ],
  providers: [
    VacanciesService,
    VacanciesStatusesService,
    CandidatesService
  ]
})
export class SystemModule {}
