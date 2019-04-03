import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacancyPageComponent } from './create-vacancy-page.component';

describe('CreateVacancyPageComponent', () => {
  let component: CreateVacancyPageComponent;
  let fixture: ComponentFixture<CreateVacancyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVacancyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVacancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
