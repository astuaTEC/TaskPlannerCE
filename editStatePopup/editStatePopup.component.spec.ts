import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatePopupComponent } from './editStatePopup.component';

describe('EditStatePopupComponent', () => {
  let component: EditStatePopupComponent;
  let fixture: ComponentFixture<EditStatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
