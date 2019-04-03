import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesPageComponent } from './vacancies-page.component';

describe('VacanciesPageComponent', () => {
  let component: VacanciesPageComponent;
  let fixture: ComponentFixture<VacanciesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanciesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
