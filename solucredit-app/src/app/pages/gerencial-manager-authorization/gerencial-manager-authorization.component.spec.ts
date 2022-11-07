import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerencialManagerAuthorizationComponent } from './gerencial-manager-authorization.component';

describe('GerencialManagerAuthorizationComponent', () => {
  let component: GerencialManagerAuthorizationComponent;
  let fixture: ComponentFixture<GerencialManagerAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerencialManagerAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerencialManagerAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
