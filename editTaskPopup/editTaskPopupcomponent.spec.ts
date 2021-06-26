import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPopupComponent } from './editTaskPopup.component';

describe('EditTaskPopupComponent', () => {
  let component: EditTaskPopupComponent;
  let fixture: ComponentFixture<EditTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
