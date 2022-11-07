import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmodalComponent } from './documentmodal.component';

describe('DocumentmodalComponent', () => {
  let component: DocumentmodalComponent;
  let fixture: ComponentFixture<DocumentmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
