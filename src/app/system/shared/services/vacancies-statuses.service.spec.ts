import { TestBed } from '@angular/core/testing';

import { VacanciesStatusesService } from './vacancies-statuses.service';

describe('VacanciesStatusesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacanciesStatusesService = TestBed.get(VacanciesStatusesService);
    expect(service).toBeTruthy();
  });
});
