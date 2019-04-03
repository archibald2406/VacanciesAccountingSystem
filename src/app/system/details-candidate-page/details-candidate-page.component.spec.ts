import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCandidatePageComponent } from './details-candidate-page.component';

describe('DetailsCandidatePageComponent', () => {
  let component: DetailsCandidatePageComponent;
  let fixture: ComponentFixture<DetailsCandidatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCandidatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCandidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
