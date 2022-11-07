import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPatrimonialIndividualComponent } from './estado-patrimonial-individual.component';

describe('EstadoPatrimonialIndividualComponent', () => {
  let component: EstadoPatrimonialIndividualComponent;
  let fixture: ComponentFixture<EstadoPatrimonialIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoPatrimonialIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoPatrimonialIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
