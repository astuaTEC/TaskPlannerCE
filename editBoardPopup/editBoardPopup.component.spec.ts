import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardPopupComponent } from './editBoardPopup.component';

describe('EditBoardPopupComponent', () => {
  let component: EditBoardPopupComponent;
  let fixture: ComponentFixture<EditBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
