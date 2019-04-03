import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVacancyPageComponent } from './details-vacancy-page.component';

describe('DetailsVacancyPageComponent', () => {
  let component: DetailsVacancyPageComponent;
  let fixture: ComponentFixture<DetailsVacancyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVacancyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVacancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
