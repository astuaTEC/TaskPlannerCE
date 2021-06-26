import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypePopupComponent } from './new-type-popup.component';

describe('NewTypePopupComponent', () => {
  let component: NewTypePopupComponent;
  let fixture: ComponentFixture<NewTypePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTypePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
