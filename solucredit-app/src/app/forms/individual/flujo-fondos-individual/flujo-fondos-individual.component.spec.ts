import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoFondosIndividualComponent } from './flujo-fondos-individual.component';

describe('FlujoFondosIndividualComponent', () => {
  let component: FlujoFondosIndividualComponent;
  let fixture: ComponentFixture<FlujoFondosIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoFondosIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoFondosIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
