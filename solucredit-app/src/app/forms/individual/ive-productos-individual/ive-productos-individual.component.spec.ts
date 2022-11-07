import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IveProductosIndividualComponent } from './ive-productos-individual.component';

describe('IveProductosIndividualComponent', () => {
  let component: IveProductosIndividualComponent;
  let fixture: ComponentFixture<IveProductosIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IveProductosIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IveProductosIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
