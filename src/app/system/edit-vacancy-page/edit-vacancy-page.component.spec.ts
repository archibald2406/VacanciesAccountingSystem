import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacancyPageComponent } from './edit-vacancy-page.component';

describe('EditVacancyPageComponent', () => {
  let component: EditVacancyPageComponent;
  let fixture: ComponentFixture<EditVacancyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVacancyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
