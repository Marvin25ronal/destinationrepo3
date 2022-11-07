import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeicIndividualComponent } from './feic-individual.component';

describe('FeicIndividualComponent', () => {
  let component: FeicIndividualComponent;
  let fixture: ComponentFixture<FeicIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeicIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeicIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
